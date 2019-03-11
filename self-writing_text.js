'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SelfWritingText =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SelfWritingText, _HTMLElement);

  _createClass(SelfWritingText, [{
    key: "strings",
    set: function set(val) {
      // Устанавливаем текст для автопечати, если необходимо несколько слов разделяем их запятой
      this.setAttribute('strings', val);
    }
  }]);

  function SelfWritingText() {
    var _this;

    _classCallCheck(this, SelfWritingText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelfWritingText).call(this));
    _this.self = _assertThisInitialized(_assertThisInitialized(_this));
    _this.strings_array = _this.getAttribute('strings').split(','); // Создаю массив из слов

    _this.current_text = ''; // текст для отображения

    _this.count_writen = 0; // начальный счетчик, если несколько слов

    _this.protect_flag = false; // защита текущего текста

    _this.shadow = _this.attachShadow({
      mode: 'open'
    }); // shadowroot

    _this.shadow.innerHTML = "\n      <style>\n\n\n    .added_span {\n        color: white;\n        display: flex;\n        overflow: hidden;\n        user-select: none;\n    }\n    .add_span, .line {\n        font-size: 18px;\n  margin-right: 6px;\n       \n    }\n\n    .line {\n        animation: anim_span .6s linear infinite alternate;\n    }\n    @keyframes anim_span {\n        from {\n            opacity: 0;\n        }\n        to {\n            opacity: 1;\n        }\n    }\n\n      </style>\n      <p class='added_span'><span class='line anim_span'>|</span></p>\n    ";

    _this.self.write_text(_this.strings_array); // вызываем ф-ю печати текста


    return _this;
  }

  _createClass(SelfWritingText, [{
    key: "write_text",
    value: function write_text(arr, body_txt) {
      var _this2 = this;

      // принимает массив строк и класс куда добавляем
      var elem = this.shadow.querySelector('.added_span'); // родитель для вставки текста

      var line_elem = this.shadow.querySelector('.line');

      if (!this.protect_flag) {
        // если флаг не стоит
        this.current_text = arr[this.count_writen]; // ставлю текущую стрингу из массива строк

        this.protect_flag = true; // блокирую последующую вставку пока не отработает
      }

      if (this.current_text.length > 0) {
        // если количество символов в строке не исчерпано
        var span = document.createElement('span'); // создаю спан

        span.setAttribute('class', 'add_span'); // даю класс для стилизации

        span.append(this.current_text[0]); // добавляю букву из строки

        this.current_text = this.current_text.slice(1); // удаляю букву из строки

        elem.insertBefore(span, line_elem); // вставляю в родителя спан перед имитацией печатки

        setTimeout(function () {
          _this2.self.write_text(arr); // повторяю итерацию

        }, 300);
        return;
      } else {
        // если текущая строка пустая
        setTimeout(function () {
          var deleteinterval = setInterval(function () {
            var all_added_spans = _this2.shadow.querySelectorAll('.add_span'); // получаю вновь созданные спаны с текстом


            if (all_added_spans.length === 0) {
              // если вновь созданных спанов не осталось
              clearInterval(deleteinterval); // очищаю интервал

              if (_this2.count_writen !== arr.length - 1) {
                // если не достигнута макс. стринга из массива строк
                _this2.count_writen++; // увеличиваю счетчик

                _this2.protect_flag = false; // активирую флаг

                _this2.self.write_text(arr); // перезапускаю ф-ю


                return;
              } else {
                // если строк не осталось
                _this2.count_writen = 0; // обнуляю счетчик

                _this2.protect_flag = false;

                _this2.self.write_text(arr);

                return;
              }
            }

            elem.removeChild(all_added_spans[all_added_spans.length - 1]); // удаляю последний спан из строки
          }, 150);
        }, 1000);
      }
    }
  }]);

  return SelfWritingText;
}(_wrapNativeSuper(HTMLElement));

customElements.define('app-self-writing', SelfWritingText);
