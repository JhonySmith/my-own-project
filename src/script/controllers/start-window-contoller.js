import StartWindow from '../blocks/start-window.js';
import textPrinter from '../text-printer.js';

export default class StartWindowController {
  constructor() {
    this._defaultTextBlock = null;
    this._contactTextBlock = null;

    this._descriptionText = `Данный сайт сделан для демонстрации моих навыков в web разработке, что то вроде сайта резюме.
    Разработка начата 15.11.2020 с чистого листа. Для данного проекта нет готового дизайна,
    разве что в моей голове и кусками <span class="start-window__comment"> (эй-пссс...если
    ты дизайнер, скажи что поменять &#128579;)</span> На сегодняшний день уже есть база из
    сертификатов и личных познаний...но подробнее об этом можно будет почитать дальше.&#128521;`;

    this._contactsText = `Если возникла необходимость связаться со мной, возможно у вас есть
    работа для меня, или интересный проект, а возможно возникла идея
    по улучшению данного проекта - мои контактные данные ниже:<p>email: evesnin68@gmail.com`;
  }

  render() {
    const body = document.querySelector('body');

    const startWindow = new StartWindow();
    body.prepend(startWindow.getElement());

    this._defaultTextBlock = body.querySelector('.start-window__default-text');
    this._contactTextBlock = body.querySelector('.start-window__contacts');

    this.renderDefaultText();
  }

  renderDefaultText() {
    this._defaultTextBlock.classList.add('start-window__cursor');

    this._defaultTextBlock.addEventListener('textprinted', () => {
      this._defaultTextBlock.classList.remove('start-window__cursor');
      this.renderContactsBlock();
    });

    textPrinter(this._defaultTextBlock, this._descriptionText);
  }

  renderContactsBlock() {
    this._contactTextBlock.classList.add('start-window__cursor');
    textPrinter(this._contactTextBlock, this._contactsText);
  }
}
