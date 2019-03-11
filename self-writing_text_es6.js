'use strict'
class SelfWritingText extends HTMLElement {



    set strings(val) { // Устанавливаем текст для автопечати, если необходимо несколько слов разделяем их запятой

        this.setAttribute('strings', val);
    }




    constructor() {

      super();
      this.self = this;

        this.strings_array = this.getAttribute('strings').split(','); // Создаю массив из слов
        this.current_text = ''; // текст для отображения
        this.count_writen = 0; // начальный счетчик, если несколько слов
        this.protect_flag = false; // защита текущего текста
      this.shadow = this.attachShadow({mode: 'open'}); // shadowroot

      this.shadow.innerHTML = `
      <style>


    .added_span {
        color: white;
        display: flex;
        overflow: hidden;
        user-select: none;
    }
    .add_span, .line {
        font-size: 18px;
         margin-right: 6px
        
    }

    .line {
        animation: anim_span .6s linear infinite alternate;
    }
    @keyframes anim_span {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

      </style>
      <p class='added_span'><span class='line anim_span'>|</span></p>
    `
this.self.write_text(this.strings_array); // вызываем ф-ю печати текста
    }


write_text(arr, body_txt) { // принимает массив строк и класс куда добавляем
    const elem = this.shadow.querySelector('.added_span'); // родитель для вставки текста
    const line_elem = this.shadow.querySelector('.line')

    if(!this.protect_flag) { // если флаг не стоит
        this.current_text = arr[this.count_writen]; // ставлю текущую стрингу из массива строк
        this.protect_flag = true; // блокирую последующую вставку пока не отработает
    }


    if(this.current_text.length > 0){ // если количество символов в строке не исчерпано

    const span = document.createElement('span'); // создаю спан
    span.setAttribute('class','add_span'); // даю класс для стилизации
    span.append(this.current_text[0]); // добавляю букву из строки
    this.current_text = this.current_text.slice(1); // удаляю букву из строки

    elem.insertBefore(span, line_elem); // вставляю в родителя спан перед имитацией печатки
    setTimeout(() => {
        this.self.write_text(arr); // повторяю итерацию
    }, 300);
    return;
    } else { // если текущая строка пустая

    setTimeout(() => {


        const deleteinterval = setInterval(() => {
            const all_added_spans = this.shadow.querySelectorAll('.add_span'); // получаю вновь созданные спаны с текстом


            if(all_added_spans.length === 0){ // если вновь созданных спанов не осталось

                clearInterval(deleteinterval); // очищаю интервал
                if(this.count_writen !== arr.length - 1) { // если не достигнута макс. стринга из массива строк
                    this.count_writen++; // увеличиваю счетчик
                    this.protect_flag = false; // активирую флаг
                    this.self.write_text(arr); // перезапускаю ф-ю
                    return;
                } else { // если строк не осталось
                    this.count_writen = 0; // обнуляю счетчик
                    this.protect_flag = false;
                    this.self.write_text(arr);
                    return;
                }

            }
            elem.removeChild(all_added_spans[all_added_spans.length - 1]); // удаляю последний спан из строки
        }, 150);

    }, 1000);


    }
}
}

  customElements.define('app-self-writing', SelfWritingText);

  
