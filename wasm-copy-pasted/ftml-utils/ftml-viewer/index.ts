import * as FTML from "./ftml-viewer-base"; // "./ftml-viewer-base"; //
import * as FLAMS from "../flams";

declare global {
  interface Window { FLAMS_SERVER_URL:string }
}

/** 
 * Turns on debugging messages on the console
 */
export function setDebugLog() { FTML.set_debug_log(); }

/** 
 * Get the FLAMS server used globally
 */
export function getFlamsServer(): FLAMS.FLAMSServer {
  return new FLAMS.FLAMSServer(window.FLAMS_SERVER_URL);
}

/** 
 * Set the FLAMS server used globally 
 */
export function setServerUrl(s:string) {
  window.FLAMS_SERVER_URL = s;
  FTML.set_server_url(s);
}

/** 
 * Get the FLAMS server URL used globally 
 */
export function getServerUrl(): string {
  return window.FLAMS_SERVER_URL;
}

/** 
 * Configuration for rendering FTML content
 */
export interface FTMLConfig {
  /** 
   * callback for wrapping sections
   */
  onSection?: (uri:FTML.DocumentElementURI,lvl:FTML.SectionLevel) => (FTML.LeptosContinuation | undefined),
  /** 
   * callback for *inserting* elements immediately after a section's title
   */
  onSectionTitle?: (uri:FTML.DocumentElementURI,lvl:FTML.SectionLevel) => FTML.LeptosContinuation | undefined,
  /** 
   * callback for wrapping logical paragraphs (Definitions, Theorems, Examples, etc.)
   */
  onParagraph?: (uri:FTML.DocumentElementURI,kind:FTML.ParagraphKind) => FTML.LeptosContinuation | undefined,
  /** 
   * callback for wrapping inputreferences (i.e. lazily loaded document fragments)
   */
  onInputref?: (uri:FTML.DocumentURI) => FTML.LeptosContinuation | undefined,
  /** 
   * callback for wrapping (beamer presentation) slides
   */
  onSlide?: (uri:FTML.DocumentElementURI) => FTML.LeptosContinuation | undefined,
  /** 
   * configuration for exercises
   */
  exercises?:ExerciseConfig 
}

/** 
 * What to do with exercises?
 */ 
export type ExerciseConfig = 
  /** 
   * use existent feedback 
   */
  [FTML.DocumentElementURI,FTML.ExerciseFeedback][] |
  /** 
   * use existent solutions
   */
  [FTML.DocumentElementURI,FTML.Solutions][] |
  /** 
   * call this function whenever user response changes
   */
  ((response:FTML.ExerciseResponse) => void);

/**
 * sets up a leptos context for rendering FTML documents or fragments.
 * If a context already exists, does nothing, so is cheap to call
 * {@link renderDocument} and {@link renderFragment} also inject a context
 * iff none already exists, so this is optional in every case.
 * 
 * @param {HTMLElement} to The element to render into
 * @param {FTML.LeptosContinuation} then The code to execute *within* the leptos context (e.g. various calls to 
 *        {@link renderDocument} or {@link renderFragment})
 * @param {FTMLConfig?} cfg Optional configuration
 * @returns {FTML.FTMLMountHandle}; its {@link FTML.FTMLMountHandle.unmount} method removes the context. Not calling
 *          this is a memory leak.
 */
export function ftmlSetup(to:HTMLElement,then:FTML.LeptosContinuation,cfg?:FTMLConfig): FTML.FTMLMountHandle {
  const [exOpt,onExercise] = splitExerciseOptions(cfg);
  return FTML.ftml_setup(to,then,cfg?.onSection,cfg?.onSectionTitle,cfg?.onParagraph,cfg?.onInputref,cfg?.onSlide,exOpt,onExercise);
}

/**
 * render an FTML document to the provided element
 * @param {HTMLElement} to The element to render into
 * @param {FTML.DocumentOptions} document The document to render
 * @param {FTML.LeptosContext?} context The leptos context to use (if any)
 * @param {FTMLConfig?} cfg Optional configuration
 * @returns {FTML.FTMLMountHandle}; its {@link FTML.FTMLMountHandle.unmount} method removes the context. Not calling
 *          this is a memory leak.
 */
export function renderDocument(to:HTMLElement,document:FTML.DocumentOptions,context?:FTML.LeptosContext,cfg?:FTMLConfig): FTML.FTMLMountHandle {
  const [exOpt,onExercise] = splitExerciseOptions(cfg);
  return FTML.render_document(to,document,context,cfg?.onSection,cfg?.onSectionTitle,cfg?.onParagraph,cfg?.onInputref,cfg?.onSlide,exOpt,onExercise);
}

/**
 * render an FTML document fragment to the provided element
 * @param {HTMLElement} to The element to render into
 * @param {FTML.FragmentOptions} fragment The fragment to render
 * @param {FTML.LeptosContext?} context The leptos context to use (if any)
 * @param {FTMLConfig?} cfg Optional configuration
 * @returns {FTML.FTMLMountHandle}; its {@link FTML.FTMLMountHandle.unmount} method removes the context. Not calling
 *          this is a memory leak.
 */
export function renderFragment(to:HTMLElement,fragment:FTML.FragmentOptions,context?:FTML.LeptosContext,cfg?:FTMLConfig): FTML.FTMLMountHandle {
  const [exOpt,onExercise] = splitExerciseOptions(cfg);
  return FTML.render_fragment(to,fragment,context,cfg?.onSection,cfg?.onSectionTitle,cfg?.onParagraph,cfg?.onInputref,cfg?.onSlide,exOpt,onExercise);
}

function splitExerciseOptions(cfg?:FTMLConfig): [FTML.ExerciseOption | undefined,((response: FTML.ExerciseResponse) => void) | undefined] {
  let exOpt: FTML.ExerciseOption | undefined = undefined;
  let onExercise : ((response: FTML.ExerciseResponse) => void) | undefined = undefined;
  if (cfg?.exercises) {
    if (Array.isArray(cfg.exercises)) {
      if (cfg.exercises.length > 0) {
        if (cfg.exercises[0][1] instanceof FTML.ExerciseFeedback) {
          exOpt = { WithFeedback: <[FTML.DocumentElementURI,FTML.ExerciseFeedback][]>cfg.exercises };
        } else {
          exOpt = { WithSolutions: <[FTML.DocumentElementURI,FTML.Solutions][]>cfg.exercises };
        }
      }
    } else {
      onExercise = cfg.exercises;
    }
  }
  return [exOpt,onExercise];
}