import {default as _} from "lodash";
export default function fallingAnimation(opts) {
    /**
     * @interface presentsNumber
     * @property { HTMLElement } presentField
     */

    var elemStore = [];

    var getPresentsField = _.memoize(function () {
        return getGlobalOptions().presentsField || createPresentField();
    });

    var getWindowParams = _.memoize(function () {
        const pixelRatio = window.pixelRatio || 1;
        return {
            maxWidth: document.body.clientWidth / pixelRatio,
            maxHeight: document.body.clientHeight / pixelRatio,
        };
    });

    var getDefaultOptions = _.memoize(function () {
        return {
            spacingLeft: 0,
            spacingRight: 0,
        };
    });

    var presentsMap = generatePresentsMap();

    var presentsMapMeta = [
        {
            className: "re-presents-field-row _space-around",
        },
        {
            className: "re-presents-field-row _space-around",
        },
        {
            className: "re-presents-field-row _space-around",
        },
        {
            className: "re-presents-field-row _space-around",
        },
    ];

    /**
     *
     */
    return {
        run: function (config) {
            // var config = _.merge(getDefaultOptions(), config);
            /**
             * @interface IConfig
             * @property { number } speed Скорость падаения элементов
             * @property { number } animationType тип анимании.
             * @property { number } presentsNumber Количество подарков которые будут падать.
             * Бесконечная(1)/Накопительня(2).
             */

            pasteItems();
        },
    };

    /**
     * @interface IElemStore
     * @property { number } Идентификатор элемента на странице
     * @property { number } left позиция элемента от левого края
     * @property { number } top позиция элемента от верхнего края
     */

    /** Вернет настройки переданные в функцию fallingAnimation*/
    function getGlobalOptions() {
        return _.merge(getDefaultOptions(), opts || {});
    }

    /** Вернет максимальное количесто подарков, которое мождет поместиться в строку */
    function getMaxInRow() {
        var windowParams = getWindowParams();
        var globalOptions = getGlobalOptions();
        var presentPrams = getPresentPramas();
        return (
            windowParams.maxWidth /
            (presentPrams.width +
                globalOptions.spacingLeft +
                globalOptions.spacingRight)
        );
    }

    /** Вернет параметры картинки */
    function getPresentPramas() {
        return {
            leftSpacing: 20,
            rightSpacing: 20,
            width: 150,
            height: 111.1,
        };
    }

    /** Вернет уникальный идентификатор для элемента */
    function genElemID() {
        return Date.now().valueOf();
    }

    /**
     * Функция сгенерирует карту подарков,
     * относительно ширины экрана и ширины одного подарка.
     */
    function generatePresentsMap() {
        /** TODO: Добавить высчитывание рядов */
        var maxInRow = getMaxInRow();
        var maxRows = 2;
        var result = [];
        var row = [];
        var i, j;
        var diff = 0;

        for (i = 0; i < maxRows; i++) {
            for (j = 0; j < maxInRow - diff; j++) {
                row.push(1);
            }
            result.push(row);
            row = [];
            diff = _.random(0, 5);
        }

        return result;
    }

    /** Создаст элемент подарка */
    function createElem(config) {
        /**
         * @interface IElemConfig
         * @property { string } text текст с предсказанием
         * @property { string } imgPath путь к картинке падарка.
         */
        var elem = document.createElement("div", {
            class: "re-present",
            id: genElemID(),
        });
        var position = getNextElemLeftTop();

        elem.style.left = position.left;
        elem.style.top = position.top;
        elem.classList.add("re-present");

        elem.innerHTML = `
            <div class="re-present__image">
                <img class="re-image" src="${config.imgPath}" alt="Открой меня!"/>
            </div>
        `;

        return elem;
    }

    /**
     * Вернет номенр строки и колонки элемента по отступам left/top
     */
    function getNextElemLeftTop() {
        var windowParams = getWindowParams();
        var position = _.last(elemStore);
        var maxInRow = getMaxInRow();
        var lastElemCol = position
            ? /** Если элемент есть */
              windowParams.width / position.left
            : /** Если элемент первый */
              0;
        var newLeftPosition = lastElemCol >= maxInRow ? 1 : lastElemCol + 1;

        return {
            left: newLeftPosition,
            top: 0,
        };
    }

    /** Задаст анимацию */
    function animateFall(el, row) {
        var windowParams = getWindowParams();
        el.style.transform = `translateY(-${2 * windowParams.maxHeight}px)`;
        el.style.transition = `${_.random(1, 2, true)}s all`;
        el.children[0].style.transform = "rotate(0)";
        el.children[0].style.transition = el.style.transition;

        setTimeout(function() {
            requestAnimationFrame(function() {
                el.classList.remove("re-hide");
                el.classList.add("re-present");
                el.style.transform = `translateY(0px)`;
            });
        }, _.random(row * 1000, row * 2000));
    }

    /**
     * Если в настройки не пришел контейнер для подарков - создаст его и закинет в body.
     */
    function createPresentField() {
        var presentsField = document.createElement("div", { id: "presents" });
        presentsField.id = "presents";
        presentsField.classList.add("re-presents-field");
        document.body.appendChild(presentsField);
        return presentsField;
    }

    /** Создаст строку с подартками и вернет ее */
    function createRowWithElems(items, rowIndex, totalRowsCount) {
        var elem = null;
        var row = document.createElement("div");
        row.className = "re-presents-field-row";
        row.style.top = (totalRowsCount - rowIndex - 1) * 120 + "px";
        items.forEach(function(isVisible, index) {
            elem = createElem({
                text: "Текст заглушка",
                imgPath: `./images/present-${_.random(1, 6)}.png`,
            });

            elem.className = "re-present re-hide";
            row.className = presentsMapMeta[rowIndex].className;
            row.appendChild(elem);
            if (isVisible) {
                animateFall(elem, rowIndex + 1, index + 1);
            }
        });

        return row;
    }

    /** Построчно вставит элементы  */
    function pasteItems() {
        var context = getPresentsField();
        presentsMap.forEach(function(el, index) {
            context.appendChild(
                createRowWithElems(el, index, presentsMap.length)
            );
        });
    }
}
