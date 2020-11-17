// createElement
// Возвращает HTML элемент по заданной разметке
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
