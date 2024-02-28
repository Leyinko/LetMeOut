import './inventory.css';

export default function Inventory(items, id) {
  const app = document.getElementById('app');

  const inventoryContainer = document.createElement('div');
  inventoryContainer.id = id;

  items.forEach((element) => {
    const inventoryElement = document.createElement('div');
    inventoryElement.className = 'inventory-element';

    const iconInventory = document.createElement('img');
    iconInventory.classList.add('inventory-icon');
    iconInventory.src = element;

    inventoryElement.appendChild(iconInventory);
    inventoryContainer.appendChild(inventoryElement);
  });

  app.appendChild(inventoryContainer);
}
