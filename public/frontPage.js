async function getScreenings() {
    try {
        const response = await fetch('http://localhost:5080/api/screenings/screeningsfrontpage');
        const screenings = await response.json();
        console.log(screenings);
        return screenings;
    } catch (error) {
        console.error('Error getting screenings', error)
        throw error;
    }
}

class RenderScreenings {
    async showScreenings() {
        const screenings = await getScreenings()
        const screeningsList = document.querySelector('.screeningList')

        screenings.forEach(screening => {
            const screeningLi = document.createElement('li');
            const startTime = screening.start_time.slice(0, -8);
            const startTimes = startTime.replace('T', ' ')
            screeningLi.textContent = `${screening.movie.title} - ${startTimes} - Salong: ${screening.room}`
            screeningsList.append(screeningLi);
        });
    }


}

const renderer = new RenderScreenings
renderer.showScreenings();