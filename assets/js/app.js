$(document).ready(function () {
    // $(window).load(function() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    // })
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

    $(function () {
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
    });

    const app = document.getElementById("text-effect");

    const myRand = () => {
        let r = 50;
        while (40 < r && r < 60) {
            r = Math.random() * 100;
        }
        return r;
    };

    const myColorRand = () => {
        let r = ["ff0000", "ff9a00", "d0de21", "4fdc4a", "3fdad8", "2fc9e2", "5f15f2", "ba0cf8", "fb07d9", "ff0000"];
        let color = Math.floor(Math.random() * r.length);
        console.log(color);
        return r[color];
    };

    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };

    for (let i = 0; i < 100; i++) {
        const delay = Math.random() + "s";
        const el = document.createElement("span");
        const c = hex2rgba(myColorRand(), 0.8);
        const size = Math.floor(Math.random() * 6) + 2;
        el.className = "glitter-star";
        el.style.top = myRand() + "%";
        el.style.left = myRand() + "%";
        el.style.backgroundColor = c;
        el.style.boxShadow = "0 0 6px " + c;
        el.style.width = size + "px"
        el.style.height = size + "px"
        el.style.animationDelay = delay;
        el.style.msAnimationDelay = delay;
        el.style.webkitAnimationDelay = delay;
        el.style.monAnimationDelay = delay;
        app.appendChild(el);
    }
});
