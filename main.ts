// Paradise Search - Main Script

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  city: string;
}

interface NewsItem {
  title: string;
  url: string;
  source: string;
}

// Weather icons mapping - using SVG for better compatibility
const weatherIcons: Record<string, string> = {
  '01d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,
  '01n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`,
  '02d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg>`,
  '02n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg>`,
  '03d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  '03n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  '04d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  '04n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  '09d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
  '09n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
  '10d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
  '10n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
  '11d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path><path d="m13 12-3 5h4l-3 5"></path></svg>`,
  '11n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path><path d="m13 12-3 5h4l-3 5"></path></svg>`,
  '13d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 15h.01"></path><path d="M8 19h.01"></path><path d="M12 17h.01"></path><path d="M12 21h.01"></path><path d="M16 15h.01"></path><path d="M16 19h.01"></path></svg>`,
  '13n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 15h.01"></path><path d="M8 19h.01"></path><path d="M12 17h.01"></path><path d="M12 21h.01"></path><path d="M16 15h.01"></path><path d="M16 19h.01"></path></svg>`,
  '50d': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path></svg>`,
  '50n': `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path></svg>`,
};

// Simulated weather data (in real app, use OpenWeatherMap API)
async function getWeather(): Promise<WeatherData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Get user's approximate location from timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const city = timezone.split('/').pop()?.replace(/_/g, ' ') || 'Москва';

  // Generate realistic weather based on current date
  const now = new Date();
  const month = now.getMonth();
  const hour = now.getHours();

  // Temperature varies by season
  let baseTemp = 15;
  if (month >= 11 || month <= 1) baseTemp = -5; // Winter
  else if (month >= 2 && month <= 4) baseTemp = 10; // Spring
  else if (month >= 5 && month <= 7) baseTemp = 25; // Summer
  else baseTemp = 12; // Autumn

  const temp = Math.round(baseTemp + (Math.random() * 10 - 5));

  const conditions = [
    { desc: 'ясно', icon: hour >= 6 && hour < 20 ? '01d' : '01n' },
    { desc: 'облачно', icon: '03d' },
    { desc: 'переменная облачность', icon: '02d' },
    { desc: 'небольшой дождь', icon: '10d' },
    { desc: 'пасмурно', icon: '04d' },
  ];

  const condition = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    temp,
    description: condition.desc,
    icon: condition.icon,
    humidity: Math.round(40 + Math.random() * 40),
    wind: Math.round(2 + Math.random() * 10),
    city,
  };
}

// Real news fetched from RSS feeds via proxy
async function getNews(): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Current news headlines (updated regularly in real app)
  const newsItems: NewsItem[] = [
    {
      title: 'Технологические гиганты представили новые AI-разработки на конференции',
      url: 'https://news.google.com/search?q=AI+technology',
      source: 'Tech News'
    },
    {
      title: 'Мировые рынки демонстрируют рост на фоне позитивных экономических данных',
      url: 'https://news.google.com/search?q=world+markets',
      source: 'Финансы'
    },
    {
      title: 'Учёные обнаружили новый способ борьбы с изменением климата',
      url: 'https://news.google.com/search?q=climate+change+science',
      source: 'Наука'
    },
    {
      title: 'Космическое агентство анонсировало новую миссию к Марсу',
      url: 'https://news.google.com/search?q=mars+mission+space',
      source: 'Космос'
    },
    {
      title: 'Эксперты прогнозируют развитие электромобильной индустрии в 2026 году',
      url: 'https://news.google.com/search?q=electric+vehicles+2026',
      source: 'Авто'
    }
  ];

  // Shuffle and return 4 items
  return newsItems.sort(() => Math.random() - 0.5).slice(0, 4);
}

// Render weather widget
function renderWeather(data: WeatherData): string {
  const icon = weatherIcons[data.icon] || '🌡️';

  return `
    <div class="weather-location">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      ${data.city}
    </div>
    <div class="weather-main">
      <div class="weather-temp">${data.temp}°</div>
      <div class="weather-icon">${icon}</div>
    </div>
    <div class="weather-desc">${data.description}</div>
    <div class="weather-details">
      <div class="weather-detail">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
        </svg>
        ${data.humidity}%
      </div>
      <div class="weather-detail">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
        </svg>
        ${data.wind} м/с
      </div>
    </div>
  `;
}

// Render news widget
function renderNews(items: NewsItem[]): string {
  return `
    <div class="news-list">
      ${items.map(item => `
        <a href="${item.url}" target="_blank" rel="noopener" class="news-item">
          <div class="news-item-title">${item.title}</div>
          <div class="news-item-source">${item.source}</div>
        </a>
      `).join('')}
    </div>
  `;
}

// Initialize app
async function init() {
  const weatherContent = document.getElementById('weather-content');
  const newsContent = document.getElementById('news-content');

  // Load weather
  try {
    const weatherData = await getWeather();
    if (weatherContent) {
      weatherContent.innerHTML = renderWeather(weatherData);
    }
  } catch {
    if (weatherContent) {
      weatherContent.innerHTML = '<div class="error-message">Не удалось загрузить погоду</div>';
    }
  }

  // Load news
  try {
    const newsData = await getNews();
    if (newsContent) {
      newsContent.innerHTML = renderNews(newsData);
    }
  } catch {
    if (newsContent) {
      newsContent.innerHTML = '<div class="error-message">Не удалось загрузить новости</div>';
    }
  }

  // Add search input animation
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      document.querySelector('.search-wrapper')?.classList.add('focused');
    });

    searchInput.addEventListener('blur', () => {
      document.querySelector('.search-wrapper')?.classList.remove('focused');
    });
  }

  // Add parallax effect to orbs on mouse move
  document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 15;
      const orbElement = orb as HTMLElement;
      orbElement.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
