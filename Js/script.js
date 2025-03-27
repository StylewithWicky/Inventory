document.addEventListener('DOMContentLoaded', () => {
    const PORT = 4000; // Or any free port

    const baseUrl = 'http://localhost:4000/Inventory'; 

    document.getElementById('viewButton').addEventListener('click', async () => {
        try {
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const items = await response.json();

            const List = document.getElementById('List');
            List.innerHTML = ''; 

            if (items.length === 0) {
                List.innerHTML = '<li>No items found.</li>';
                return;
            }

            items.forEach(items => {
                const listItem = document.createElement('li');
                listItem.textContent = ` Title: ${items.title}, Amount: ${items.amount}`;
                List.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
            alert('Failed to fetch books. Please try again.');
        }

    });
    document.getElementById('saveButton').addEventListener('click', async () => {
        const bookId = document.getElementById('bookId').value.trim();
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('amount').value.trim();

        if (!title || !author) {
            alert("Please enter both item and amount!");
            return;
        }

        const bookData = { title, amount };

        try {
            let response;
            if (title) {
               
                
               
                response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
            document.getElementById('Id').value = ''; 
            document.getElementById('title').value = ''; 
            document.getElementById('amount').value = '';
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save item. Please try again.');
        }
    });

    document.getElementById('deleteButton').addEventListener('click', async () => {
        const items = document.getElementById('deleteId').value.trim();

        if (!items) {
            alert("Please enter a item to delete!");
            return;
        }

        
        try {
            const response = await fetch(`${baseUrl}/${items}`, {
                method: 'DELETE'
            });

            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);
            document.getElementById('deleteId').value = ''; // Clear Book ID field
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete Item. Please try again.');
        }
    });
});
