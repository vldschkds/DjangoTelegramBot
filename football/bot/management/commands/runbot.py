import logging
from telegram import InlineKeyboardMarkup, InlineKeyboardButton
from telegram import Update, WebAppInfo
from telegram.ext import ApplicationBuilder, CallbackContext, CommandHandler

from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Launching the bot"

    def handle(self, *args, **options):
        application = ApplicationBuilder().token('6900558584:AAGmaHhLHyrBRkcda9bbNpDFDAFmTEg9iQ4').build()

        start_handler = CommandHandler('start', self.start)
        application.add_handler(start_handler)

        application.run_polling()

        self.stdout.write('My custom command executed successfully')

    logging.basicConfig(
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        level=logging.INFO
    )

    async def start(self, update: Update, context: CallbackContext):
        await update.message.reply_text(
            "Чтобы узнать результаты, нажмите на ссылку ниже!",

            reply_markup=InlineKeyboardMarkup.from_button(
                InlineKeyboardButton(
                    text="Старт",
                    web_app=WebAppInfo(url="https://b75b-89-151-189-238.ngrok-free.app"),
                )
            )
        )