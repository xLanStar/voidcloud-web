import { readdirSync, readFileSync } from "fs";

let idPerfix = "";
const svgTitle = /<svg(.*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;

const hasViewBox = /(viewBox="[^>+].*?")/g;

const clearReturn = /(\r)|(\n)/g;

const wrapElement = (iconId) => ($1, $2) => {
  let width = 0;
  let height = 0;
  let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
    if (s2 === "width") {
      width = s3;
    } else if (s2 === "height") {
      height = s3;
    }
    return "";
  });
  if (!hasViewBox.test($2)) {
    if (width || height) content += `viewBox="0 0 ${width} ${height}"`;
    else content += 'viewBox="0 0 24 24"';
  }
  return `<symbol id="${idPerfix}-${iconId}"${content}>`;
};

const findSVG = (dir) => {
  const svgRes = [];
  for (const dirent of readdirSync(dir, {
    withFileTypes: true,
  })) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSVG(dir + dirent.name + "/"));
    } else {
      const svg =
        readFileSync(dir + dirent.name)
          .toString()
          .replace(clearReturn, "")
          .replace(svgTitle, wrapElement(dirent.name.replace(".svg", "")))
          .slice(0, -4) + "symbol>";
      svgRes.push(svg);
    }
  }
  return svgRes;
};

export const svgBuilder = (svgpath, perfix = "i") => {
  if (svgpath === "") return;
  idPerfix = perfix;
  const res = findSVG(svgpath);
  return {
    name: "svg-transform",
    transformIndexHtml(html) {
      return html.replace(
        "<body>",
        `<body>
		<svg style="display: none">
		   ${res.join("")}
		</svg>`
      );
    },
  };
};
