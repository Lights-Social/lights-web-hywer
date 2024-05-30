import {
  forEach,
  insertBefore,
  bind,
} from "../../../../../node_modules/hywer/src/hywer/alias.js"

const genElementAndIndex = (i, e) => ({
  index: i,
  element: e,
})

export const reactiveArrayRender = (reactiveArray, elem, mapper) => {
  let parentElement = elem;
  let objectsToElementsMapping = new Map();
  let objectIsUsed = new Map();

  let updateChildren = (val) => {
    for (let i in val) {
      let obj = val[i]

      let elementAndIndex = objectsToElementsMapping.get(obj);
      if (!elementAndIndex) {
        let elementFromObject = mapper(obj, i);
        parentElement[insertBefore](elementFromObject, parentElement.children[i]);

        objectsToElementsMapping.set(obj, genElementAndIndex(i, elementFromObject));
        objectIsUsed.set(obj, true)

        continue
      }

      if (elementAndIndex.index != i) {
        parentElement[insertBefore](elementAndIndex.element, parentElement.children[i])
        elementAndIndex.index = i
      }

      objectIsUsed.set(obj, true)
    }

    objectsToElementsMapping[forEach]((val, key) => {
      if (!objectIsUsed.has(key)) {
        val.element.remove()
        objectsToElementsMapping.delete(key)
      }
    })

    objectIsUsed.clear()
  }
  reactiveArray[bind](parentElement, updateChildren)

  for (let i in reactiveArray.val) {
    let obj = reactiveArray.val[i]

    let e = mapper(obj, i);

    parentElement.append(e)

    objectsToElementsMapping.set(obj, genElementAndIndex(i, e));
  }

  
  return parentElement
}

//<ArrayRender in={arr} elem={<div></div>}>
//  (e) => {
//    return <h1>e</h1>
//  }
//</ArrayRender>
export const InfiniteScroll = ({ children, "in": inObject, elem }) => {
  let arrayRenderElement = reactiveArrayRender(inObject, elem, children[0]);

  observerBottom.observe(arrayRenderElement.lastChild);
  observerTop.observe(arrayRenderElement.firstChild);

  
  return arrayRenderElement;
}



const options = {
  // родитель целевого элемента - область просмотра
  root: null,
  // без отступов
  rootMargin: '0px',
  // процент пересечения - половина изображения
  threshold: 0.1
}

// создаем наблюдатель
const observerBottom = new IntersectionObserver((entries, observer) => {
  // для каждой записи-целевого элемента
  entries.forEach(entry => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
          const element = entry.target

          clearTopElements(element.parentElement)
      }
  })
}, options)

const observerTop = new IntersectionObserver((entries, observer) => {
  // для каждой записи-целевого элемента
  entries.forEach(entry => {
      // если элемент является наблюдаемым
      if (entry.isIntersecting) {
          const element = entry.target

          clearBottomElements(element.parentElement)
      }
  })
}, options)

const numberToRemove = 5;


function clearBottomElements(arrayRenderElement) {
  const children = arrayRenderElement.children;

  for (let i = 0; i < numberToRemove; i++) {
      const lastChildIndex = children.length - 1;
      
      if (lastChildIndex >= 0) {
        arrayRenderElement.removeChild(children[lastChildIndex]);
      }
  }

  observerTop.observe(children[0]);

}

function clearTopElements(arrayRenderElement) {
  for (let i = 0; i < numberToRemove; i++) {
    // Удаляем первый дочерний элемент, если он существует
    if (arrayRenderElement.firstChild) {
      arrayRenderElement.removeChild(arrayRenderElement.firstChild);
    }
  }

  observer.observe(arrayRenderElement.lastChild);
}
