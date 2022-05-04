jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    },
};
jQuery.event.special.touchmove = {
    setup: function (_, ns, handle) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    },
};
jQuery.event.special.wheel = {
    setup: function (_, ns, handle) {
        this.addEventListener("wheel", handle, { passive: true });
    },
};
jQuery.event.special.mousewheel = {
    setup: function (_, ns, handle) {
        this.addEventListener("mousewheel", handle, { passive: true });
    },
};

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

    var isHeroLoaded = false;
    $("#space-bg").scroll(function (e) {
        if (!isHeroLoaded) {
            isHeroLoaded = true;
            init();
        }
        var h = $(window).height();
        var w = $(window).width();
        var bgs = 110;
        if (w <= 768) {
            bgs = 245;
        }
        $("#space-bg .bg").css("opacity", 1 - $(this).scrollTop() / 700);
        $(".stars-outer").css("opacity", 1 - $(this).scrollTop() / 800);
        $("#space-bg .bg").css("background-size", `${bgs + $(this).scrollTop() / 50}%`);
        if (1 - $(this).scrollTop() / 700 < 0) {
            $("header").addClass("show");
            $(".hero-container").addClass("show");
            $("#space-bg").remove();
        }
        if ($(this).scrollTop() > 100) {
            $(".scroll-text").addClass("hide");
        }
    });

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
