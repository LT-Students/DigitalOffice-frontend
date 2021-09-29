import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';
import { EditorJSParser } from '../../parser';

@Component({
	selector: 'do-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFeedComponent implements OnInit {
	public DATA: any = [
		{
			blocks: [
				{
					"type": "header",
					"data": {
						"text": "Кастомный парсер",
						"level": 2
					}
				},
				{
					"type": "header",
					"data": {
						"text": "Что умеет парсер",
						"level": 3
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Несколько дней я посвятил себя поиску парсера, но затем решил на основе найденных решений написать собственный. Сие решение было принято вследствие того, что существующие парсеры не соответствовали требованию парсинга по отдельности: картинки без figure, не было вложенных списков, а блоки статьи были простыми элементами html, без обёрток, что не позволяло гибко настроить парсинг блока."
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "В следующей главе представлены примеры парсинга блоков с комбинациями возможных настроек, если таковы существуют."
					}
				},
				{
					"type": "header",
					"data": {
						"text": "Виды блоков",
						"level": 3
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Текущая версия парсера обладает следующим набором блоков:"
					}
				},
				{
					"type": "list",
					"data": {
						"style": "unordered",
						"items": [
							{
								"content": "Заголовок",
								"items": [
									{
										"content": "h1",
										"items": []
									},
									{
										"content": "h2",
										"items": []
									},
									{
										"content": "h3",
										"items": []
									},
									{
										"content": "h4",
										"items": []
									},
									{
										"content": "h5",
										"items": []
									},
									{
										"content": "h6",
										"items": []
									}
								]
							},
							{
								"content": "Параграф",
								"items": []
							},
							{
								"content": "Разделитель",
								"items": []
							},
							{
								"content": "Вложенный список",
								"items": []
							},
							{
								"content": "Картинка",
								"items": [
									{
										"content": "Картинка без подписи",
										"items": []
									},
									{
										"content": "Картинка с подписью (figure и figurecaption)",
										"items": []
									}
								]
							},
							{
								"content": "Цитата",
								"items": []
							}
						]
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Рассмотрим их подробнее."
					}
				},
				{
					"type": "header",
					"data": {
						"level": 4,
						"text": "Картинка"
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Начнём с самого интересного и запутанного - картинки. Картинки могут быть двух типов: с подписью и без подписи. Также у них могут быть 3 настройки: stretched, withBorder, withBackground. Настройка stretched растягивает картинку на всю ширину контейнера, withBorder"
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Ниже представлены все варианты картинок с включенными флажками, всего их 9: "
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Стандартная картинка без флажков и без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": false,
						"withBackground": false,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажком stretched и без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": false,
						"withBackground": false,
						"stretched": true
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажком withBorder и без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": true,
						"withBackground": false,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажком withBackground и без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": false,
						"withBackground": true,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажками stretched и withBorder, без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": true,
						"withBackground": false,
						"stretched": true
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажками stretched и withBackground, без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": false,
						"withBackground": true,
						"stretched": true
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажками withBorder и withBackground, без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": true,
						"withBackground": true,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка со всеми флажками, без подписи"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "",
						"withBorder": true,
						"withBackground": true,
						"stretched": true
					}
				},
				{
					"type": "header",
					"data": {
						"text": "Далее пойдут картинки с подписью",
						"level": 4
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Стандартная картинка без флажков и с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": false,
						"withBackground": false,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажком stretched и с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": false,
						"withBackground": false,
						"stretched": true
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажком withBorder и с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": true,
						"withBackground": false,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажком withBackground и с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": false,
						"withBackground": true,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажками stretched и withBorder, с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": true,
						"withBackground": false,
						"stretched": true
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажками stretched и withBackground, с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": false,
						"withBackground": true,
						"stretched": true
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка с флажками withBorder и withBackground, с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": true,
						"withBackground": true,
						"stretched": false
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Картинка со всеми флажками, с подписью"
					}
				},
				{
					"type": "image",
					"data": {
						"file": {
							"url": "https://codex.so/public/app/img/external/codex2x.png"
						},
						"caption": "Codex egle",
						"withBorder": true,
						"withBackground": true,
						"stretched": true
					}
				},
				{
					"type": "header",
					"data": {
						"text": "Разделитель",
						"level": 3
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Отвлечёмся на попроще, ведь в дальнейших главах нас ожидает ещё одна жопа по написанию, но не по реализации"
					}
				},
				{
					"type": "delimiter",
					"data": {}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Только что вы увидели как работает разделитель, спасибо."
					}
				},
				{
					"type": "header",
					"data": {
						"text": "Форматирование",
						"level": 3
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Любой текст в статье может быть стилизован. Стили к тексту добавляются через редактор, оборачивая текст в теги. Благодаря реализации парсинга, стили и теги сами применяются к тексту, что отбрасывает нужду в их обработке."
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Это обычный текст. <b>Это жирный текст</b>. <i>Это курсивный текст</i>. <u>Это подчёркнутый текст.</u> <a href=\"http://123\">Это линка</a>. <mark class=\"cdx-marker\">Это маркированный текст</mark>. <i><b>Это жирный курсив</b></i>. <b><u>Это жирный подчёрк</u></b>. <a href=\"http://123\"><b>Это жирная линка</b></a>. <b><mark class=\"cdx-marker\">Это жирный маркер</mark></b>. <b><i><mark class=\"cdx-marker\"><u>Это жирный курсивный маркированный подчёрк.&nbsp;</u></mark></i></b><mark class=\"cdx-marker\"><a href=\"http://123\"><b><i><u>Это жирный курсивный маркированный подчёрк с линкой.</u></i></b></a></mark><b><i></i></b>"
					}
				},
				{
					"type": "list",
					"data": {
						"style": "ordered",
						"items": [
							{
								"content": "Это обычный текст.&nbsp;",
								"items": []
							},
							{
								"content": "<b>Это жирный текст.</b>&nbsp;",
								"items": [
									{
										"content": "<i><b>Это жирный курсив.&nbsp;</b></i>",
										"items": []
									},
									{
										"content": "<b><u>Это жирный подчёрк.&nbsp;</u></b>",
										"items": [
											{
												"content": "&nbsp;<b><i><mark class=\"cdx-marker\">Это жирный курсивный маркированный подчёрк.&nbsp;</mark></i></b>",
												"items": [
													{
														"content": "<a href=\"http://1231\"><b><i><mark class=\"cdx-marker\">Это жирный курсивный маркированный подчёрк с линкой.</mark></i></b></a>",
														"items": []
													}
												]
											}
										]
									},
									{
										"content": "<a href=\"http://1231\"><b>Это жирная линка.&nbsp;</b></a>",
										"items": []
									},
									{
										"content": "<b><mark class=\"cdx-marker\">Это жирный маркер.</mark></b>",
										"items": []
									}
								]
							},
							{
								"content": "<i>Это курсивный текст.</i>&nbsp;",
								"items": []
							},
							{
								"content": "<u>Это подчёркнутый текст.&nbsp;</u>",
								"items": []
							},
							{
								"content": "<a href=\"http://13123\">Это линка.&nbsp;</a>",
								"items": []
							},
							{
								"content": "<mark class=\"cdx-marker\">Это маркированный текст.&nbsp;</mark>",
								"items": []
							},
						]
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "А как насчёт форматированных заголовков?"
					}
				},
				{
					"type": "header",
					"data": {
						"text": "<a href=\"http://13123\">Это линка.&nbsp;</a>",
						"level": 3
					}
				},
				{
					"type": "header",
					"data": {
						"text": "<mark>Это марк.&nbsp;</mark>",
						"level": 3
					}
				},
				{
					"type": "header",
					"data": {
						"text": "Цитата",
						"level": 2
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Цитата с выравниванием текста по левой стороне"
					}
				},
				{
					"type": "quote",
					"data": {
						"text": "Shit.",
						"caption": "Me",
						"aligment": "left"
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Цитата с выравниванием текста по центру"
					}
				},
				{
					"type": "quote",
					"data": {
						"text": "Shit.",
						"caption": "Me",
						"aligment": "center"
					}
				},
				{
					"type": "paragraph",
					"data": {
						"text": "Цитата с выравниванием текста по правой стороне"
					}
				},
				{
					"type": "quote",
					"data": {
						"text": "Shit.",
						"caption": "Me",
						"aligment": "right"
					}
				}
			]
		},
		{
			"blocks":
				[
					{
						"id": "lYcGlRm3Nw",
						"type": "header",
						"data": {
							"text": "Editor.js",
							"level": 3
						}
					},
					{
						"id": "i5Hej6qoAd",
						"type": "paragraph",
						"data": {
							"text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
						}
					},
					{
						"id": "TFzlydah7w",
						"type": "header",
						"data": {
							"text": "Key features",
							"level": 4
						}
					},
					{
						"type": "button",
						"data": {
							"text": "INDICATER"
						}
					},
					{
						"id": "UOYCR8u6gm",
						"type": "list",
						"data": {
							"style": "unordered",
							"items": [
								"It is a block-styled editor",
								"It returns clean data output in JSON",
								"Designed to be extendable and pluggable with a simple API"
							]
						}
					},
					{
						"id": "t9NFEprM_0",
						"type": "header",
						"data": {
							"text": "What does it mean «block-styled editor»",
							"level": 1
						}
					},
					{
						"id": "E0zUxE56h6",
						"type": "paragraph",
						"data": {
							"text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
						}
					},
					{
						"id": "FdEdzPU_ra",
						"type": "paragraph",
						"data": {
							"text": "There are dozens of <a style='color: red;' href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
						}
					},
					{
						"id": "0CCAYLdJbW",
						"type": "header",
						"data": {
							"text": "What does it mean clean data output",
							"level": 5
						}
					},
					{
						"id": "bitvVKFwGm",
						"type": "paragraph",
						"data": {
							"text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
						}
					},
					{
						"id": "QUk7NaQ0qG",
						"type": "paragraph",
						"data": {
							"text": "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
						}
					},
					{
						"id": "vSA3hlC0OW",
						"type": "paragraph",
						"data": {
							"text": "Clean data is useful to sanitize, validate and process on the backend."
						}
					},
					{
						"id": "etNuEF-R2M",
						"type": "delimiter",
						"data": {}
					},
					{
						"id": "iBX71uywqb",
						"type": "paragraph",
						"data": {
							"text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
						}
					},
					{
						"id": "X1SUHFm7nQ",
						"type": "image",
						"data": {
							"file": {
								"url": "https://codex.so/public/app/img/external/codex2x.png"
							},
							"caption": "",
							"imgClass": '',
							"withBorder": false,
							"stretched": false,
							"withBackground": false
						}
					}
				]
		},
		{
			"blocks": [
				{
					"id": "lYcGlRm3Nw",
					"type": "header",
					"data": {
						"text": "Editor.js",
						"level": 6
					}
				},
				{
					"id": "i5Hej6qoAd",
					"type": "paragraph",
					"data": {
						"text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
					}
				},
				{
					"id": "X1SUHFm7nQ",
					"type": "image",
					"data": {
						"file": {
							"url": "https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg"
						},
						"caption": "",
						"withBorder": false,
						"stretched": false,
						"withBackground": false
					}
				},
				{
					"id": "t9NFEprM_0",
					"type": "header",
					"data": {
						"text": "What does it mean «block-styled editor»",
						"level": 4
					}
				},
				{
					"id": "E0zUxE56h6",
					"type": "paragraph",
					"data": {
						"text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
					}
				},
				{
					"id": "FdEdzPU_ra",
					"type": "paragraph",
					"data": {
						"text": "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
					}
				},
				{
					"id": "0CCAYLdJbW",
					"type": "header",
					"data": {
						"text": "What does it mean clean data output",
						"level": 4
					}
				},
				{
					"id": "bitvVKFwGm",
					"type": "paragraph",
					"data": {
						"text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
					}
				},
				{
					"id": "QUk7NaQ0qG",
					"type": "paragraph",
					"data": {
						"text": "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
					}
				},
				{
					"id": "vSA3hlC0OW",
					"type": "paragraph",
					"data": {
						"text": "Clean data is useful to sanitize, validate and process on the backend."
					}
				},
				{
					"id": "etNuEF-R2M",
					"type": "delimiter",
					"data": {}
				},
				{
					"id": "iBX71uywqb",
					"type": "paragraph",
					"data": {
						"text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
					}
				}
			]
		},
		{
			"blocks": [
				{
					"id": "lYcGlRm3Nw",
					"type": "header",
					"data": {
						"text": "Editor.js",
						"level": 4
					}
				},
				{
					"id": "i5Hej6qoAd",
					"type": "paragraph",
					"data": {
						"text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
					}
				},
				{
					"id": "TFzlydah7w",
					"type": "header",
					"data": {
						"text": "Key features",
						"level": 4
					}
				},
				{
					"id": "UOYCR8u6gm",
					"type": "list",
					"data": {
						"style": "unordered",
						"items": [
							"It is a block-styled editor",
							"It returns clean data output in JSON",
							"Designed to be extendable and pluggable with a simple API"
						]
					}
				},
				{
					"id": "t9NFEprM_0",
					"type": "header",
					"data": {
						"text": "What does it mean «block-styled editor»",
						"level": 4
					}
				},
				{
					"id": "E0zUxE56h6",
					"type": "paragraph",
					"data": {
						"text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
					}
				},
				{
					"id": "FdEdzPU_ra",
					"type": "paragraph",
					"data": {
						"text": "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
					}
				},
				{
					"id": "0CCAYLdJbW",
					"type": "header",
					"data": {
						"text": "What does it mean clean data output",
						"level": 4
					}
				},
				{
					"id": "bitvVKFwGm",
					"type": "paragraph",
					"data": {
						"text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
					}
				},
				{
					"id": "QUk7NaQ0qG",
					"type": "paragraph",
					"data": {
						"text": "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
					}
				},
				{
					"id": "vSA3hlC0OW",
					"type": "paragraph",
					"data": {
						"text": "Clean data is useful to sanitize, validate and process on the backend."
					}
				},
				{
					"id": "etNuEF-R2M",
					"type": "delimiter",
					"data": {}
				},
				{
					"id": "iBX71uywqb",
					"type": "paragraph",
					"data": {
						"text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
					}
				}
			]
		}
	]

	private parser = new EditorJSParser();
	public html: string[] | undefined;

	public fixedTags: boolean;

	constructor(
		private matDialog: MatDialog,
		@Inject(DOCUMENT) private document: Document
	) {
		this.fixedTags = false;
	}

	@HostListener("window: scroll", []) onWindowScroll() {
		if (this.document.documentElement.scrollTop >= 100) {
			this.fixedTags = true;
		} else {
			this.fixedTags = false;
		}
	}

	ngOnInit(): void {
		this.html = this.DATA.map((post: any) => `${this.parser.parse(post.blocks).join("")}`);
	}

	public onMenuOpen(event: any) {
		event.stopPropagation();
	}

	public openPost(post: string): void {
		const style = getComputedStyle(this.document.documentElement);

		this.matDialog
			.open(PostComponent,
				{
					maxHeight: `calc(100vh - ${style.getPropertyValue('--header-height')})`,
					maxWidth: '100vw',
					height: `calc(100% - ${style.getPropertyValue('--header-height')})`,
					width: '100%',
					data: post,
					autoFocus: false,
					backdropClass: 'cdk-overlay-transparent-backdrop',
					position: { bottom: '0' },
					panelClass: 'dialog-shadow-none'
				})
	}
}
