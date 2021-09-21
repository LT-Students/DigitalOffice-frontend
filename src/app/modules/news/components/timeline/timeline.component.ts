import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewChecked, ElementRef, ViewEncapsulation } from '@angular/core';
//@ts-ignore 
import edjsParser from 'editorjs-parser/src/Parser'

@Component({
	selector: 'do-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit, AfterViewChecked {
	@ViewChild('timelines') timelines: ElementRef | undefined;

	public myConfig = {
		image: {
			use: "img",
			imgClass: "kekel",
		}
	}

	public parser = new edjsParser(this.myConfig);
	public html: string[] | undefined;

	public DATA = [{
		"blocks": [
			{
				"id": "lYcGlRm3Nw",
				"type": "header",
				"data": {
					"text": "Editor.js",
					"level": 2
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
					"level": 3
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
					"level": 3
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
					"level": 3
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
						"url": "https://lh3.googleusercontent.com/proxy/Y8rZ2s7YCxclp0sU3rtDMm_BDLHlVOTVKR13BUGu8kLFBbDcnYO5hKkPEECSpv9siNmCL7ZGq9LkkGE"
					},
					"caption": "",
					"imgClass": '',
					"withBorder": true,
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
					"level": 2
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
					"level": 3
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
					"level": 3
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
					"level": 3
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
					"level": 2
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
					"level": 3
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
					"level": 3
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
					"level": 3
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
	}]

	constructor() {
	}

	ngOnInit(): void {
		this.html = this.DATA.map(post => `<mat-card>${this.parser.parse(post)}</mat-card>`);
		console.log(this.html)
	}

	ngAfterViewChecked() {
		// this.timelines.nativeElement.innerHTML = `${this.html}`
	}

}
