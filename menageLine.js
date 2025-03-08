function toggleEvent(eventId) {
    let allEvents = document.querySelectorAll('.timeline ol li div');
    allEvents.forEach(event => {
        if (event.id !== eventId) {
            event.style.display = 'none';
        }
    });
    let selectedEvent = document.getElementById(eventId);
    selectedEvent.style.display = selectedEvent.style.display === 'block' ? 'none' : 'block';
}