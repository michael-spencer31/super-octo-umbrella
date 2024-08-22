import axios, * as others from 'axios';
const cheerio = require('cheerio')

export function calculate(a, b) {
    return a + b;
}
const url = 'https://www.atlanticuniversitysport.com/sports/wice/2023-24/standings';

export async function scrape() {

    try {
        const elem = []
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const table = $('table');

        if (table.length === 0) {
            console.log('Table not found on the page.');
            return;
        }
        const headers = [];
        table.find('th').each((i, elem) => {
            headers.push($(elem).text().trim());
        });

        const rows = [];
        $(elem).find('td').each((j, cell) => {
            const row = [];
            $(elem).find('td').each((j, cell) => {
                row.push($(cell).text().trim());
            });
            if (rows.length > 0) {
                rows.push(row);
            }
        });
        console.log(headers.join(' | '));
        console.log('-'.repeat(headers.join(' | ').length));

        rows.forEach(row => {
            console.log(row.join(' | '));
        });
    } catch (error) {
        console.error('Error fetching page: ', error.message);
    }
}