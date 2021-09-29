interface ItemList {
	content: string,
	items: Array<ItemList>
}

interface Block {
	type: string,
	data: {
		text?: string;
		level?: number;
		caption?: string;
		aligment?: string;
		url?: string;
		file?: {
			url?: string;
		};
		stretched?: boolean;
		withBackground?: boolean;
		withBorder?: boolean;
		items?: Array<string> | Array<ItemList>;
		style?: string;
	}
}

interface Transforms {
	delimiter?: () => string,
	header?: (data: Block) => string,
	paragraph?: (data: Block) => string,
	list?: (data: Block) => string,
	image?: (data: Block) => string,
	quote?: (data: Block) => string
}

const transforms: Transforms = {
	delimiter: () => {
		return `<div class='ce-block'>
				<div class='ce-block__content'>
					<div class='ce-delimiter cdx-block'>
					</div>
				</div>
			</div>`
	},
	paragraph: ({ data }) => {
		return `<div class='ce-block'>
			<div class='ce-block__content'>
				<p>${data.text}</p>
			</div>
		</div>`
	},
	header: ({ data }) => {
		return `<div class='ce-block'>
			<div class='ce-block__content'>
				<h${data.level}>${data.text}</h${data.level}>
			</div>
		</div>`;
	},
	list: ({ data }) => {
		const listStyle = data.style === "unordered" ? "ul" : "ol";
		const listClasses = data.style === "unordered" ? '' : 'cdx-list'
		const itemClasses = listStyle === 'ol' ? 'cdx-list__item-ordered' : 'cdx-list__item';

		const recursor = (items: any, listStyle: string) => {
			console.log(items)
			const list = items.map((item: any) => {
				if (item.content && item.items.length === 0) return `<li class='${itemClasses}'>${item.content}</li>`;

				let list = "";
				if (item.items) list = recursor(item.items, listStyle);
				return `<li class='${itemClasses}'>${item.content} ${list}</li>`;
			});

			return `<${listStyle} class='list ${listClasses}'>${list.join("")}</${listStyle}>`;
		};

		return `<div class='ce-block'>
			<div class='ce-block__content'>
				${recursor(data.items, listStyle)}
			</div>
		</div>`;
	},

	// В данном парсере картинка будет вытягиваться с сервера, а в url будет присваиваться base64(?)
	image: ({ data }) => {
		let imgClasses = "img";
		let wrapperClasses = "";
		let blockContentClasses = data.stretched ? "" : "ce-block__content";

		if (data.stretched) {
			imgClasses += " img-fullwidth";
		}
		if (data.withBorder) {
			wrapperClasses += " img-with-border";
		}
		if (data.withBackground) {
			wrapperClasses += " img-with-background";
			imgClasses += " img-background-width";
		}

		if (data.caption) {
			return `<div class='ce-block'>
				<div class='${blockContentClasses}'>
					<figure>
						<div class='${wrapperClasses}'>
							<img class='${imgClasses}' src="${data.file && (data.file.url ?? data.url)}" alt="${data.caption}">	
						<div>
						<figcaption class='img__caption'>${data.caption}</figcaption>
					</figure>
				</div>
			</div>`;
		} else {
			return `<div class='ce-block'>
				<div class='${blockContentClasses}'>
					<div class='${wrapperClasses}'>
						<img class='${imgClasses}' src="${data.file && (data.file.url ?? data.url)}" alt="Image" />
					</div>
				</div>
			</div>`;

		}
	},
	quote: ({ data }) => {
		let caption: string = "";
		let style: string = "";

		if (data.caption) caption = `<figcaption>-${data.caption}</figcaption>`
		if (data.aligment) style = `text-align: ${data.aligment}`

		return `<div class='ce-block'>
				<div class='ce-block__content'>
					<div class='ce-quote cdx-block'>
						<figure style='${style}'>
							<blockquote><p>"${data.text}"</p></blockquote>
							${caption}
						</figure>
					</div>
				</div>
			</div>`
	}
}


export class EditorJSParser {
	public parseBlock(block: Block): string {
		const type = block.type as keyof typeof transforms;
		return transforms[type] ? transforms[type]!(block) : '';
	}

	public parse(blocks: Array<Block>): string[] {
		return blocks.map(block => {
			const type = block.type as keyof typeof transforms;
			return transforms[type] ? transforms[type]!(block) : '';
		})
	}
}
