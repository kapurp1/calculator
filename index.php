<!DOCTYPE html>
<html>
	<head lang="en">
		<meta charset="UTF-8">
		<!--Priority to use the latest version of IE and Chrome-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<!--360 Use Google Chrome Frame-->
		<meta name="renderer" content="webkit">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
		<!-- Forbidden Baidu Transcoding -->
		<meta http-equiv="Cache-Control" content="no-siteapp" />
		<!--Background color of the status bar -->
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<!-- uc forced vertical screen -->
		<meta name="screen-orientation" content="portrait">
		<!-- QQ forced vertical screen -->
		<meta name="x5-orientation" content="portrait">
		<!-- UC application mode -->
		<meta name="browsermode" content="application">
		<!-- QQ application mode -->
		<meta name="x5-page-mode" content="app">
		<title>Simple Calculator</title>
		<meta name="Generator" contect="HBuild,WebStorm">
		<meta name="Keyword" content="FlexBox, animation, iconFont, web calculator, code demo, code snippet, HTML5, CSS3, JavaScript, jQuery, Bootstrap">
		<meta name="Description" content="Web Calculator">
		<meta http-equiv="Page-Enter" contect="revealTrans(duration=10,transtion= 50)">
		<meta http-equiv="Page-Exit" contect="revealTrans(duration=20,transtion=6)">
		<link rel="stylesheet" href="css/calc.css" />
	</head>

	<body>
		<div id="container">
			<div id="calc" class="calc">
				<div id="top">
					<div id="win-tool">
						<span id="close" title="Close" data-ico="✖">&nbsp;</span>
						<span id="max" title="maximize" data-ico="口">&nbsp;</span>
						<span id="resize" title="Minimize" data-ico="◎"><i class="iconfont change">&#xe612;</i></span>
					</div>
					<div id="result">
						<div id="express"></div>
						<div id="res">0</div>
					</div>
				</div>
				<div id="bottom">
					<div class="row">
						<span id="reset" data-number="C">CE</span>
						<span id="remove" data-number="←">←</span>
						<span data-number="%">%</span>
						<span data-number="/" class="tool divide">÷</span>
					</div>
					<div class="row">
						<span data-number="7">7</span>
						<span data-number="8">8</span>
						<span data-number="9">9</span>
						<span data-number="*" class="tool multiply">×</span>
					</div>
					<div class="row">
						<span data-number="4">4</span>
						<span data-number="5">5</span>
						<span data-number="6">6</span>
						<span data-number="-" class="tool substract">ᅳ</span>
					</div>
					<div class="row">
						<span data-number="1">1</span>
						<span data-number="2">2</span>
						<span data-number="3">3</span>
						<span data-number="+" class="tool add">+</span>
					</div>
					<div class="row">
						<span data-number="0" class="zero">0</span>
						<span data-number="." class="dian">.</span>
						<span id="equals" data-number="=" class="tool eq">=</span>
					</div>
					<div class="row">
						<span class="sav" id="saveBtn" data-number="save">Save</span>
					</div>
				</div>

				<div id="historyBox">
					<div class="con">
						<ul></ul>
					</div>
					<div class="remove">
						<a href="javascript:;" title="Clear History"><i class="iconfont del">&#xe613;</i></a>
					</div>
				</div>
			</div>
		</div>
		<!--Mobile dialing function -->
		<a href="#" id="telPhone" data-flag = "" ></a>

		<script src="js/zepto/zepto.min.js"></script>
		<script src="js/zepto/fx.js"></script>
		<script src="js/zepto/touch.js"></script>
		<script src="js/common.js"></script>
		<script src="js/calc.js"></script>
	</body>

</html>
