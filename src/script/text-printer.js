const textPrinter = (element, text, printSpeed = 20) => {
  let i = 0;

  const print = () => {
    i++;
    if (i < text.length + 1) {
      element.innerHTML = text.substr(0, i);
      setTimeout(print, printSpeed);
    } else {
      let event = new Event('textprinted');
      element.dispatchEvent(event);
    }
  };

  print();
};

export default textPrinter;
