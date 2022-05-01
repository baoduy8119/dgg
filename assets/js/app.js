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
});
