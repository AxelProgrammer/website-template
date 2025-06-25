
document.addEventListener('DOMContentLoaded', function () {
    const checklist = document.getElementById('checklist_with_strikethrough');
    const items = ['Make a code', 'Sleep', 'To eat'];

    items.forEach((item, index) => {
        const id = `item-${index + 1}`;
        const value = index + 1;

        // We create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.name = 'r';
        checkbox.value = value;

        // We create label
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = item;

        // Add elements to checklist
        checklist.appendChild(checkbox);
        checklist.appendChild(label);
    });
});