$(document).ready(function () {
    // $(window).load(function() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    // })
    $(".vision-items .text-item").mouseover(function () {
        $(".vision-items .active-item").removeClass("active");
        $(this).next().addClass("active");
    });
    $(".toggle-menu").on("click", function (e) {
        e.preventDefault();
        $(".nav-mobile").toggleClass("show");
    });
    $(document).on("click", function (t) {
        (0 !== $("header").has(t.target).length && 1 !== $(".btn-close").has(t.target).length) || $(".nav-mobile").removeClass("show");
    });
    $("header a").on("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });

    $.fn.moveIt = function () {
        var $window = $(window);
        var instances = [];

        $(this).each(function () {
            instances.push(new moveItItem($(this)));
        });

        window.addEventListener(
            "scroll",
            function () {
                var scrollTop = $window.scrollTop();
                instances.forEach(function (inst) {
                    inst.update(scrollTop);
                });
            },
            { passive: true }
        );
    };

    var moveItItem = function (el) {
        this.el = $(el);
        this.speed = parseInt(this.el.attr("data-scroll-speed"));
    };

    moveItItem.prototype.update = function (scrollTop) {
        this.el.css("transform", "translateY(" + -(scrollTop / this.speed) + "px)");
    };

    $("[data-scroll-speed]").moveIt();
    $(document).on('scroll', '#space-bg', function(){
        console.log(1111);
    })

    $("#space-bg").on( 'scroll', function(){
        console.log(2222);
    });

    console.log($("#space-bg").scrollTop());

    document.addEventListener('scroll', function (event) {
        if (event.target.id === 'space-bg') { // or any other filtering condition        
            console.log('scrolling', event.target);
        }
    }, true /*Capture event*/);

    $("#space-bg").scroll(function (e) {
        console.log(e);
        var h = $(window).height();
        var w = $(window).width();
        var bgs = 100;
        if (w <= 768) {
            bgs = 245;
        }
        if (w/h < 1.77) {
            bgs = 200;
        }
        $("#space-bg").css("opacity", 1 - $("#space-bg").scrollTop() / 10000);
        $(".stars-outer").css("opacity", 1 - $("#space-bg").scrollTop() / 10000);
        $("#space-bg").css("background-size", `${bgs + $("#space-bg").scrollTop() / 50}%`);
        console.log('scrollTop',$("#space-bg").scrollTop());
        console.log(1 - $("#space-bg").scrollTop() / 10000);
        if (1 - $("#space-bg").scrollTop() / 10000 < 0.4) {
            $(".hero-container").addClass("show");
        }
        if (1 - $("#space-bg").scrollTop() / 10000 < 0.25) {
            $("header").addClass("show");
            $("body").removeClass('banner-active');
        }
        if (1 - $("#space-bg").scrollTop() / 10000 < 0.1) {
            $("#space-bg").remove();
        }
        if ($("#space-bg").scrollTop() > 100) {
            $(".scroll-text").addClass("hide");
        }
    });

   if($(window).width()/$(window).height()<1.77) {
    $("#space-bg").css("background-size", "200%");
   }

    function getCenter(sky) {
        const w = sky.clientWidth;
        const h = sky.clientHeight;
        return {
            x: parseInt(w / 2),
            y: parseInt(h / 2),
        };
    }

    function getDot(x, y, group) {
        const size = Math.round(Math.random() + 2);
        const dot = document.createElement("span");
        dot.classList.add("stars-star", `stars-axis-${group}`, `stars-size-${size}`);
        dot.style.top = `${y}px`;
        dot.style.left = `${x}px`;
        return dot.cloneNode();
    }

    function init() {
        const sky = document.querySelector("#stars-sky");
        sky.innerHTML = "";
        for (let i = 1; i < 360; i++) {
            const { x, y } = getCenter(sky);
            const dot = getDot(x, y, i);
            sky.appendChild(dot);
        }
    }

    init();
    
    $(window).on("load", function () {
        let isLoaded = false;
        $(window).scroll(function (event) {
            if (!isLoaded) {
                isLoaded = true;
                for (var i = 1; i <= 8; i++) {
                    new spine.SpinePlayer(`smoke-effect-${i}`, {
                        jsonUrl: "assets/js/spine/smoke-web.json",
                        atlasUrl: "assets/js/spine/smoke-web.atlas",
                        alpha: true,
                        backgroundColor: "#00000000",
                        animation: "animation",
                        showControls: false,
                    });
                }
            }
        });
    });

    
});
