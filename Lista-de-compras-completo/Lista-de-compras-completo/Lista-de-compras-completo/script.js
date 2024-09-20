document.addEventListener('DOMContentLoaded', function() {
    const shoppingList = document.getElementById('shopping-list');
    const boughtList = document.getElementById('bought-list');
    const newItemInput = document.getElementById('new-item-input');
    const addItemButton = document.querySelector('.add-item-button');
    const shoppingMessage = document.getElementById('shopping-message');
    const boughtTitle = document.getElementById('bought-title');

    // Função para obter a data atual formatada
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para verificar se a lista de compras está vazia e exibir a mensagem
    function updateShoppingMessage() {
        if (shoppingList.children.length === 0) {
            shoppingMessage.style.display = 'block';
        } else {
            shoppingMessage.style.display = 'none';
        }
    }

    // Função para verificar se a lista de comprados está vazia e exibir/ocultar a seção
    function updateBoughtSection() {
        if (boughtList.children.length === 0) {
            boughtTitle.style.display = 'none';
        } else {
            boughtTitle.style.display = 'block';
        }
    }

    // Atualizar as mensagens ao carregar a página
    updateShoppingMessage();
    updateBoughtSection();

    // Função para adicionar novo item à lista de compras
    addItemButton.addEventListener('click', function() {
        const itemName = newItemInput.value.trim();
        if (itemName !== '') {
            const listItem = createListItem(itemName);
            shoppingList.appendChild(listItem);
            newItemInput.value = '';  // Limpar o campo após adicionar
            updateShoppingMessage();
        }
    });

    // Função para criar um novo item da lista com checkbox, ícones de edição, exclusão e data
    function createListItem(itemName) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('item-checkbox');

        const label = document.createElement('label');
        label.textContent = itemName;

        // Adicionando a data ao item
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('item-date');
        dateSpan.textContent = ` (Adicionado em: ${getCurrentDate()})`;

        const icons = document.createElement('span');
        icons.classList.add('icons');

        // Ícone de editar
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-pen');
        editIcon.addEventListener('click', function() {
            const newName = prompt('Editar item:', label.textContent);
            if (newName !== null && newName.trim() !== '') {
                label.textContent = newName;
            }
        });

        // Ícone de excluir
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');
        deleteIcon.addEventListener('click', function() {
            li.remove();
            updateShoppingMessage();
            updateBoughtSection();
        });

        icons.appendChild(editIcon);
        icons.appendChild(deleteIcon);

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(dateSpan);  // Adicionando a data
        li.appendChild(icons);

        // Mover item para lista de comprados
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                li.classList.add('checked');
                boughtList.appendChild(li);
            } else {
                li.classList.remove('checked');
                shoppingList.appendChild(li);
            }
            updateBoughtSection();
            updateShoppingMessage();
        });

        return li;
    }
});

