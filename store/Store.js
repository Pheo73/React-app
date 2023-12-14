import { create } from 'zustand';

export const useItemStore = create((set) => ({
  data: [
    { key: 'Faire les courses' },
    { key: 'Aller à la salle de sport 3 fois par semaine' },
    { key: 'Monter à plus de 5000m d altitude' },
    { key: 'Acheter mon premier appartement' },
    { key: 'Perdre 5 kgs' },
    { key: 'Gagner en productivité' },
    { key: 'Apprendre un nouveau langage' },
    { key: 'Faire une mission en freelance' },
    { key: 'Organiser un meetup autour de la tech' },
    { key: 'Faire un triathlon' },
  ],
  addItem: (newItem) =>
    set((state) => ({
      data: [...state.data, { key: newItem }],
    })),
  removeItem: (itemToRemove) =>
    set((state) => ({
      data: state.data.filter((item) => item !== itemToRemove),
    })),
    removeAndAddItem: (itemToRemove, newItem) =>
    set((state) => ({
      data: [...state.data.filter((item) => item !== itemToRemove), { key: newItem }],
    })),
  editItemModalIsVisible: false,

  toggleEditItemModal: (isVisible) =>
    set(() => ({
      editItemModalIsVisible: isVisible,
    })),
  setSelectedItem: (item) =>
    set((state) => ({
      selectedItem: item,
    })),
}));
