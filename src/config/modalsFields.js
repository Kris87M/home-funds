export const incomeFields = [
  { 
    name: 'date', 
    label: 'Data', 
    type: 'date', 
    rules: [{ required: true, message: 'Wybierz datę!' }] 
  },
  { 
    name: 'source', 
    label: 'Źródło dochodu', 
    rules: [{ required: true, message: 'Wprowadź źródło dochodu!' }] 
  },
  { 
    name: 'amount', 
    label: 'Kwota', 
    type: 'number', 
    rules: [
      { required: true, message: 'Wprowadź kwotę!' },
      { 
        validator: (_, value) => {
          if (value < 0) {
            return Promise.reject('Kwota nie może być ujemna!');
          }
          if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
            return Promise.reject('Kwota może mieć maksymalnie dwa miejsca po przecinku!');
          }
          return Promise.resolve();
        }
      }
    ]
  },
];

export const potsFields = [
  { 
    name: 'name', 
    label: 'Nazwa skarbonki', 
    type: 'text', 
    rules: [{ required: true, message: 'Wprowadź nazwę!' }] 
  },
  { 
    name: 'date', 
    label: 'Data utworzenia skarbonki', 
    type: 'date', 
    rules: [{ required: true, message: 'Wybierz datę!' }] 
  },
  { 
    name: 'amount', 
    label: 'Kwota do zebrania:', 
    type: 'number', 
    rules: [
      { required: true, message: 'Wprowadź kwotę!' },
      { 
        validator: (_, value) => {
          if (value < 0) {
            return Promise.reject('Kwota nie może być ujemna!');
          }
          if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
            return Promise.reject('Kwota może mieć maksymalnie dwa miejsca po przecinku!');
          }
          return Promise.resolve();
        }
      }
    ]
  },
  { 
    name: 'totalSaved', 
    label: 'Kwota początkowa', 
    type: 'number', 
    rules: [
      { required: true, message: 'Wprowadź kwotę początkową!' },
      { 
        validator: (_, value) => {
          if (value < 0) {
            return Promise.reject('Kwota nie może być ujemna!');
          }
          if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
            return Promise.reject('Kwota może mieć maksymalnie dwa miejsca po przecinku!');
          }
          return Promise.resolve();
        }
      }
    ]
  },
];

export const billsFields = [
  { 
    name: 'name', 
    label: 'Nazwa', 
    type: 'text', 
    rules: [{ required: true, message: 'Wprowadź nazwę!' }] 
  },
  { 
    name: 'amount', 
    label: 'Kwota', 
    type: 'number', 
    rules: [
      { required: true, message: 'Wprowadź kwotę!' },
      { 
        validator: (_, value) => {
          if (value < 0) {
            return Promise.reject('Kwota nie może być ujemna!');
          }
          if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
            return Promise.reject('Kwota może mieć maksymalnie dwa miejsca po przecinku!');
          }
          return Promise.resolve();
        }
      }
    ]
  },
  { 
    name: 'dueDate', 
    label: 'Termin płatności', 
    type: 'date', 
    rules: [{ required: true, message: 'Wybierz datę!' }] 
  },
  { 
    name: 'category', 
    label: 'Kategoria', 
    type: 'text', 
    rules: [{ required: true, message: 'Wprowadź kategorię!' }] 
  },
];

export const transactionsFields = [
  { 
    name: 'date', 
    label: 'Data', 
    type: 'date', 
    rules: [{ required: true, message: 'Wybierz datę!' }] 
  },
  { 
    name: 'description', 
    label: 'Opis', 
    rules: [{ required: true, message: 'Wprowadź Opis!' }] 
  },
  { 
    name: 'amount', 
    label: 'Kwota', 
    type: 'number', 
    rules: [
      { required: true, message: 'Wprowadź kwotę!' },
      { 
        validator: (_, value) => {
          if (value < 0) {
            return Promise.reject('Kwota nie może być ujemna!');
          }
          if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
            return Promise.reject('Kwota może mieć maksymalnie dwa miejsca po przecinku!');
          }
          return Promise.resolve();
        }
      }
    ]
  },
  { 
    name: 'category', 
    label: 'Kategoria', 
    rules: [{ required: true, message: 'Wprowadź kategorię!' }] 
  },
];
