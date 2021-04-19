let Drag = function () {
    function isElement(obj) {
        return (typeof HTMLElement === 'object')
            ? (obj instanceof HTMLElement)
            : !!(obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string');
    }


    let elements = document.getElementsByClassName("drag");
    for (let elementsKey in elements) {
        let element = elements[elementsKey];
        if (!isElement(element)) {
            continue;
        }
        drag(element);
    }

    function drag(element) {
        element.setAttribute("ondragstart", "return false");
        element.style.position = "relative";
        element.onmousedown = function (e) {
            this.setAttribute("drag", "true");
            this.setAttribute("x", e.x);
            this.setAttribute("y", e.y);
            this.setAttribute("t", isNaN(Number.parseInt(this.style.top)) ? 0 : Number.parseInt(this.style.top));
            this.setAttribute("l", isNaN(Number.parseInt(this.style.left)) ? 0 : Number.parseInt(this.style.left));
        }
        element.onmousemove = function (e) {
            if (this.getAttribute("drag") === "true") {
                if (this.offsetLeft >= this.parentElement.offsetLeft ||
                    this.offsetLeft <= this.parentElement.offsetLeft + this.parentElement.offsetWidth ||
                    this.offsetTop >= this.parentElement.offsetTop ||
                    this.offsetTop <= this.parentElement.offsetTop + this.parentElement.offsetHeight
                ) {
                    this.style.left = e.x - (Number.parseInt(this.getAttribute("x"))) + (Number.parseInt(this.getAttribute("l"))) + "px";
                    this.style.top = e.y - (Number.parseInt(this.getAttribute("y"))) + (Number.parseInt(this.getAttribute("t"))) + "px";
                }
            }
        }
        element.onmouseup = function (e) {
            this.setAttribute("drag", "false");
            this.setAttribute("x", e.x);
            this.setAttribute("y", e.y);
        }
        element.onmouseout = function (e) {
            this.setAttribute("drag", "false");
        }
    }

    window.drag = drag;
}();
