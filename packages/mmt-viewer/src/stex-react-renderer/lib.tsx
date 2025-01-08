import * as SHTML from "../shtml-viewer/shtml_viewer.js";

export function SomeCompo() {
  SHTML.set_server_url("https://immt.mathhub.info");
  return <div>SomeCompo:</div>;
}
