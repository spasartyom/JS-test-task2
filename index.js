const app = () => {
  // в state сохраняю выбранные ответы, так как мне показалось таким образом
  // легче осуществить проверку заполненность полей, скорее всего не самый лучший способ.
  // Обработчики меняют state, после чего, вызывается render(state). На основе state происходят манипуляции с DOM.
  // Также по условию ТЗ был непонятен 4 пункт, так как он протеворичит 2 пункту. Поэтому вывожу просто выбранные ответы.
  const state = {
    isForm: true,
    submitDisabled: true,
    colour: '',
    itemsForRain: [],
  };

  const colourOfTrafficLights = document.querySelectorAll('input[name=colourOfTrafficLights]');
  [...colourOfTrafficLights].forEach((item) => {
    item.addEventListener('input', (e) => {
      state.colour = e.target.value;
      state.submitDisabled = state.itemsForRain.length > 0 && state.colour ? false : true;
      render(state);
    });
  });

  const itemsForRain = document.querySelectorAll('input[name=itemsForRain]');
  [...itemsForRain].forEach((item) => {
    item.addEventListener('input', (e) => {
      if (e.target.checked) {
        state.itemsForRain = [...state.itemsForRain, e.target.value];
      } else {
        const newItemsForRain = state.itemsForRain.filter((item) => item !== e.target.value);
        state.itemsForRain = newItemsForRain;
      }
      state.submitDisabled = state.itemsForRain.length > 0 && state.colour ? false : true;
      render(state);
    });
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.isForm = false;
    render(state);
  });
}

const render = (state) => {
  if (state.isForm) {
    const submitInput = document.querySelector('input[type=submit]');
    if (state.submitDisabled) {
      submitInput.setAttribute('disabled', true);
    } else {
      submitInput.removeAttribute('disabled');
    }
  } else {
    const form = document.querySelector('form');
    form.style.display = "none";
    const result = document.querySelector('#result');
    result.style.display = "block";
    [...result.querySelectorAll('p')].forEach((item, index) => {
      if (index === 0) {
        item.innerHTML += `${state.colour}`;
      }
      if (index === 1) {
        item.innerHTML += `${state.itemsForRain.join(', ')}`;
      }
    });
  }
  console.log(state);
}

app();