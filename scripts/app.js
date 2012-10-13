
var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel).on(
		"pageinit", RocknCoder.hideAddressBar);
} ();

RocknCoder.Pages.manageBarChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshBarChart").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.GlobalRead),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.LocalRead);

                showChart(val1, val2);
			});
            $("#refreshBarChart1").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.CountUp),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.CountDown);

                showChart(val1, val2);
            });

            $("#refreshBarChart1b").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.ForIn, 10000),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.CountDown, 10000);

                showChart(val1, val2);
            });

            $("#refreshBarChart2").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.FarRead),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.NearRead);

                showChart(val1, val2);
            });

            $("#refreshBarChart3").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.StyleSlow, 5000),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.StyleFast, 5000);

                showChart(val1, val2);
            });

            $("#refreshBarChart4").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.plugInSlow, 5000),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.plugInFast, 5000);

                showChart(val1, val2);
            });

            $("#refreshBarChart5").on('click',function(){
                var val1 = RocknCoder.MeasurePerformance(RocknCoder.domSlow, 100),
                    val2 = RocknCoder.MeasurePerformance(RocknCoder.domFaster, 100);

                showChart(val1, val2);
            });
		},
	pagehide = function () {
		$("#refreshBarChart").off('click');
	},
	updateChart = function(){
		showChart(0, 0);
	},
	showChart = function(barA, barB){
		// should have used arguments, , [barC,5]
		$.jqplot('barChart', [[[barB, 'new'], [barA,'old']]], {
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				shadowAngle: 135,
				rendererOptions: {
					barDirection: 'horizontal'
				},
				pointLabels: {show: true, formatString: '%d'}
			},
			axes: {
				yaxis: {
					renderer: $.jqplot.CategoryAxisRenderer
				}
			}
		}).replot({clear: true, resetAxes:true});
	};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();

RocknCoder.GetTime = function() {
    return new Date().getTime();
}

RocknCoder.MeasurePerformance = function (func, cycles) {
    var startTime = new Date().getTime(),
        endTime,
        ndx = cycles || 500000;

    for(; ndx; ndx -= 1) {
        func();
    }

    endTime = new Date().getTime();
    return endTime - startTime;
}

var globalVal = 42;
RocknCoder.NearProperty = 42;
RocknCoder.Far = {};
RocknCoder.Far.Property = 42;

RocknCoder.Really = {};
RocknCoder.Really.Far = {};
RocknCoder.Really.Far.Property = 42;


RocknCoder.FarRead = function() {
    var val = RocknCoder.Really.Far.Property + 1;
}

RocknCoder.NearRead = function() {
    var val = RocknCoder.NearProperty + 1;
}


RocknCoder.GlobalRead = function() {
    var localVal = 42,
        val;

    val = globalVal;
}

RocknCoder.LocalRead = function() {
    var localVal = 42,
        val;

    val = localVal;
}

var items = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];

function process(val) {
    val += 1;
}

RocknCoder.CountUp = function() {
    for(var i=0; i < items.length; i++) {
        process(items[i]);
    }
}

RocknCoder.CountDown = function() {
    for(var i = items.length; i--;) {
        process(items[i]);
    }
}

RocknCoder.ForIn = function() {
    var i;
    for (i in items) {
        process(items[i]);
    }
}


RocknCoder.StyleSlow = function() {
    var element = document.getElementById('styleMe');
    element.style.borderLeft = '1px';
    element.style.borderRight = '2px';
    element.style.padding = '5px';
}


RocknCoder.StyleFast = function() {
    var element = document.getElementById('styleMe');
    element.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px';
}


RocknCoder.plugInSlow = function() {
    var i, val;
    for(i=0; i < 50; i++) {
        val = $('#styleMe').html();
    }
}


RocknCoder.plugInFast = function() {
    var i, val, $styleMe = $('#styleMe');
    for(i=0; i < 50; i++) {
        val = $styleMe.html();
    }
}

RocknCoder.domSlow = function () {
    document.getElementById('styleMe').innerHTML = '';
    for(var i=0; i < 100; i++){
        document.getElementById('styleMe').innerHTML += 'a';
    }
}

RocknCoder.domFaster = function () {
    var content = '';
    document.getElementById('styleMe').innerHTML = '';
    for(var i=0; i < 100; i++){
        content += 'a';
    }
    document.getElementById('styleMe').innerHTML += content;
}