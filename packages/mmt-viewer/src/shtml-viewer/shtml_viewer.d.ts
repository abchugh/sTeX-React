/* tslint:disable */
/* eslint-disable */
/**
 * sets the server url used to the provided one; by default `https://immt.mathhub.info`.
 */
export function set_server_url(server_url: string): void;
/**
 * render an SHTML document to the provided element
 * #### Errors
 */
export function render_document(to: HTMLElement, document: DocumentOptions, on_section_start?: ((uri: string) => Element | null), on_section_end?: ((uri: string) => Element | null)): SHTMLMountHandle;
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
/**
 * Options for rendering an SHTML document
 * - `FromBackend`: calls the backend for the document
 *     uri: the URI of the document (as string)
 *     toc: if defined, will render a table of contents for the document
 * - `HtmlString`: render the provided HTML String
 *     html: the HTML String
 *     toc: if defined, will render a table of contents for the document
 */
export type DocumentOptions = { FromBackend: { uri: string; toc: TOCOptions | undefined } } | { HtmlString: { html: string; toc: TOCElem[] | undefined } };

/**
 * Options for rendering a table of contents
 * `FromBackend` will retrieve it from the remote backend
 * `Predefined(toc)` will render the provided TOC
 */
export type TOCOptions = "FromBackend" | { Predefined: TOCElem[] };

/**
 * An entry in a table of contents. Either:
 * 1. a section; the title is assumed to be an HTML string, or
 * 2. an inputref to some other document; the URI is the one for the
 *    inputref itself; not the referenced Document. For the TOC,
 *    which document is inputrefed is actually irrelevant.
 */
export type TOCElem = { Section: { title: string | undefined; uri: string; id: string; children: TOCElem[] } } | { Inputref: { uri: string; title: string | undefined; id: string; children: TOCElem[] } };

/**
 * A Table of contents; Either:
 * 1. an already known TOC, consisting of a list of [`TOCElem`]s, or
 * 2. the URI of a Document. In that case, the relevant iMMT server
 *    will be requested to obtain the TOC for that document.
 */
export type TOC = { Full: TOCElem[] } | { Get: string };

export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  start(controller: ReadableByteStreamController): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  cancel(): void;
  readonly type: ReadableStreamType;
  readonly autoAllocateChunkSize: number;
}
export class IntoUnderlyingSink {
  private constructor();
  free(): void;
  write(chunk: any): Promise<any>;
  close(): Promise<any>;
  abort(reason: any): Promise<any>;
}
export class IntoUnderlyingSource {
  private constructor();
  free(): void;
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}
export class SHTMLMountHandle {
  private constructor();
  free(): void;
  /**
   * unmounts the view and cleans up the reactive system.
   * Not calling this is a memory leak
   */
  unmount(): void;
}
