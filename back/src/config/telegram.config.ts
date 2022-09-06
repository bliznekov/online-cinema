import { ITelegramOptions } from 'src/telegram/telegram.interface'

export const getTelegramConfig = (): ITelegramOptions => ({
	// https://api.telegram.org/bot5695612124:AAFwtEh16yOnBtMdN8fBAHkn6xcG2tZ8EI0/getUpdates - for get chatId
	chatId: '713452077',
	token: 'AAFwtEh16yOnBtMdN8fBAHkn6xcG2tZ8EI0',
})
