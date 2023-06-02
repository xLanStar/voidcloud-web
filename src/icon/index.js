import { readdirSync, readFileSync } from 'fs';

let idPerfix = ''
const svgIconTitle = /<svg(.*?)>/
const svgTitle = /<svg(.*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g

const hasViewBox = /(viewBox="[^>+].*?")/g

const clearReturn = /(\r)|(\n)/g

const icons = [];

const findSvgFile = (dir) => {
	const svgRes = []
	const dirents = readdirSync(dir, {
		withFileTypes: true
	})
	for (const dirent of dirents) {
		if (dirent.isDirectory()) {
			svgRes.push(...findSvgFile(dir + dirent.name + '/'))
		} else {
			const svg = readFileSync(dir + dirent.name)
				.toString()
				.replace(clearReturn, '')
				.replace(svgTitle, ($1, $2) => {
					let width = 0
					let height = 0
					let content = $2.replace(
						clearHeightWidth,
						(s1, s2, s3) => {
							if (s2 === 'width') {
								width = s3
							} else if (s2 === 'height') {
								height = s3
							}
							return ''
						}
					)
					if (!hasViewBox.test($2)) {
						if (width || height)
							content += `viewBox="0 0 ${width} ${height}"`
						else
							content += 'viewBox="0 0 24 24"'
					}
					const iconId = dirent.name.replace('.svg', '');
					icons.push(iconId);
					return `<symbol id="${idPerfix}-${iconId}"${content}>`

				}).slice(0, -4) + 'symbol>';
			svgRes.push(svg)
		}
	}
	// console.log(icons);
	return svgRes
}

// const findUsedIcon = (dir) => {
// 	const icons = [];
// 	console.log(dir);
// 	const files = readdirSync(dir, {
// 		withFileTypes: true
// 	});
// 	for (const file of files) {
// 		console.log(file.name);
// 		if (file.isDirectory()) {
// 			icons.push(...findUsedIcon(join(dir, file.name)))
// 		} else {
// 			console.log(readFileSync(join(dir, file.name))
// 			.toString());
// 			const vuefile = readFileSync(join(dir, file.name))
// 				.toString()
// 				.replace(clearReturn, '')
// 				.replace(svgIconTitle, ($1, $2) => {
// 					let width = 0
// 					let height = 0
// 					let content = $2.replace(
// 						clearHeightWidth,
// 						(s1, s2, s3) => {
// 							console.log(s1, s2, s3);
// 							return ''
// 						}
// 					)
// 					// if (!hasViewBox.test($2)) {
// 					// 	if(width || height)
// 					// 		content += `viewBox="0 0 ${width} ${height}"`
// 					// 	else
// 					// 		content += 'viewBox="0 0 24 24"'
// 					// }
// 					// const iconId = dirent.name.replace('.svg', '');
// 					// icons.push(iconId);
// 					// return `<symbol id="${idPerfix}-${iconId}"${content}>`

// 				});
// 			// .push(vuefile)
// 		}
// 	}
// 	return icons;
// }

export const svgBuilder = (svgpath, perfix = 'i') => {
	if (svgpath === '') return
	idPerfix = perfix
	const res = findSvgFile(svgpath)
	// let UsedIcons = [];
	// for(const path of vuepaths)
	// 	UsedIcons = [...UsedIcons, ...findUsedIcon(path)];
	// console.log(UsedIcons);
	return {
		name: 'svg-transform',
		transformIndexHtml(html) {
			return html.replace(
				'<body>',
				`<body>
		<svg style="display: none">
		   ${res.join('')}
		</svg>`
			)
		}
	}
}