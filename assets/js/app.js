$(function () {
    $(".vision-items .item").mouseover(function () {
        $(".vision-items .active-item").removeClass("active");
        $(this).find(".active-item").addClass("active");
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

    $(window).scroll(function (event) {
        if ($(window).scrollTop() > 100) {
            $("header").addClass("show");
        }
    });

    $(window).on("load", function () {
        let isLoaded = false;
        $(window).scroll(function (event) {
            if (!isLoaded) {
                isLoaded = true;
                for (var i = 1; i <= 9; i++) {
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

    var body = $("#starshine"),
        template = $(".template.shine"),
        stars = 150,
        sparkle = 20;

    var size = "small";
    var createStar = function () {
        template
            .clone()
            .removeAttr("id")
            .css({
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                webkitAnimationDelay: Math.random() * sparkle + "s",
                mozAnimationDelay: Math.random() * sparkle + "s",
            })
            .addClass(size)
            .appendTo(body);
    };

    for (var i = 0; i < stars; i++) {
        if (i % 2 === 0) {
            size = "small";
        } else if (i % 3 === 0) {
            size = "medium";
        } else {
            size = "large";
        }

        createStar();
    }

    let maxSize = (/Mobi|Android/i.test(navigator.userAgent)) ? 4 : 10;
    window.onload = function () {
        var $main = document.querySelector("#text-effect");
        let options = {
            composition: "source-over",
            count: 250,
            speed: 0,
            parallax: 0,
            direction: 0,
            xVariance: 0.2,
            yVariance: 0.2,
            rotate: false,
            rotation: 0,
            alphaSpeed: 4.2,
            alphaVariance: 6,
            minAlpha: -0.4,
            maxAlpha: 1.4,
            minSize: 2,
            maxSize: maxSize,
            style: "fill",
            bounce: false,
            drift: 0,
            glow: 0,
            twinkle: true,
            color: ["#ffccfe", "#b5eefb", "#95c5f4", "#c2b0e3", "#dff1ff", "#fff"],
            shape: ["star", "diamond"],
            imageUrl: "",
        };
        window.mySparticles = new Sparticles($main, options);
    };
});
