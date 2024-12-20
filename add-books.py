#!/usr/bin/env python3
import json
import random
import time
import urllib.parse
import requests
import os
import base64
from datetime import datetime

# Read API URL from .env file
with open('.env') as f:
    for line in f:
        if line.startswith('NEXT_PUBLIC_API_URL'):
            API_URL = line.split('=')[1].strip()
            break

# Book images
IMAGES = [
    "https://covers.openlibrary.org/b/id/12860832-L.jpg",  # Physics book
    "https://covers.openlibrary.org/b/id/12645114-L.jpg",  # Math book
    "https://covers.openlibrary.org/b/id/12860831-L.jpg",  # Chemistry book
    "https://covers.openlibrary.org/b/id/12892119-L.jpg",  # Biology book
    "https://covers.openlibrary.org/b/id/12727691-L.jpg",  # Computer Science book
    "https://covers.openlibrary.org/b/id/12871290-L.jpg",  # Engineering book
    "https://covers.openlibrary.org/b/id/12878809-L.jpg",  # Statistics book
    "https://covers.openlibrary.org/b/id/12878810-L.jpg",  # Calculus book
    "https://covers.openlibrary.org/b/id/12878811-L.jpg",  # Linear Algebra book
    "https://covers.openlibrary.org/b/id/12878812-L.jpg",  # Quantum Physics book
    "https://covers.openlibrary.org/b/id/12878813-L.jpg",  # Organic Chemistry book
    "https://covers.openlibrary.org/b/id/12878814-L.jpg",  # Mechanics book
    "https://covers.openlibrary.org/b/id/12878815-L.jpg",  # Thermodynamics book
    "https://covers.openlibrary.org/b/id/12878816-L.jpg",  # Electronics book
    "https://covers.openlibrary.org/b/id/12878817-L.jpg",  # Materials Science book
]

# Book titles
TITLES = [
    "Квантовая механика: основы и приложения",
    "Введение в термодинамику",
    "Органическая химия",
    "Линейная алгебра",
    "Математический анализ",
    "Основы программирования",
    "Теория вероятностей",
    "Электродинамика",
    "Механика сплошных сред",
    "Статистическая физика",
    "Дифференциальные уравнения",
    "Аналитическая геометрия",
    "Физическая химия",
    "Теоретическая механика",
    "Молекулярная биология"
]

# Publishers
PUBLISHERS = [
    {"name": "АИСТ", "city": "Москва", "country": "Российская федерация"},
    {"name": "Наука", "city": "Санкт-Петербург", "country": "Российская федерация"},
    {"name": "Просвещение", "city": "Москва", "country": "Российская федерация"},
    {"name": "Высшая школа", "city": "Москва", "country": "Российская федерация"}
]

# Authors
AUTHORS = [
    [{"firstName": "Иван", "lastName": "Петров", "patronymic": "Сергеевич",
      "biography": "Профессор физики МГУ"}],
    [{"firstName": "Анна", "lastName": "Иванова", "patronymic": "Михайловна",
      "biography": "Доктор физико-математических наук"}],
    [{"firstName": "Сергей", "lastName": "Смирнов", "patronymic": "Александрович",
      "biography": "Ведущий научный сотрудник РАН"}],
    [{"firstName": "Михаил", "lastName": "Козлов", "patronymic": "Дмитриевич",
      "biography": "Академик РАН"}]
]

# PDF files for books (real, downloadable open-source textbooks)
PDF_FILES = [
    # Quantum Mechanics
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",  # Thermodynamics
    # Organic Chemistry
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",  # Linear Algebra
    # Mathematical Analysis
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",  # Programming
    # Probability Theory
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Electrodynamics
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Continuum Mechanics
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Statistical Physics
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Differential Equations
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Analytic Geometry
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Physical Chemistry
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Theoretical Mechanics
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf",
    # Molecular Biology
    "https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/10/file-sample_150kB.pdf"
]


def generate_isbn():
    return f"978-5-699-{random.randint(0, 99999):05d}-{random.randint(0, 9)}"


def generate_date():
    return datetime(2024, random.randint(1, 12), random.randint(1, 28)).strftime("%Y-%m-%d")


# Add books
for i in range(15):
    # Prepare the data
    publisher = random.choice(PUBLISHERS)
    authors = random.choice(AUTHORS)

    data = {
        "title": TITLES[i],
        "isbn": generate_isbn(),
        "authors": authors,
        "publisher": publisher,
        "publicationDate": generate_date(),
        "amount": random.randint(1, 20),
        "pageCount": random.randint(100, 600),
        "available": random.choice([True, False]),
        "imageUrl": IMAGES[i]
    }

    # Create book
    response = requests.post(
        f"{API_URL}/api/v1/university/library/book/create/DIGITAL",
        headers={
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        json=data
    )

    print(f"Added book: {TITLES[i]} (Available: {data['available']})")

    if response.status_code == 201:
        book_id = response.json().get('bookId')
        if book_id:
            # Download PDF
            print(f"Downloading PDF for book {TITLES[i]}...")
            try:
                # Disable SSL verification warning
                requests.packages.urllib3.disable_warnings()

                pdf_response = requests.get(
                    PDF_FILES[i],
                    verify=False  # Disable SSL verification
                )

                if pdf_response.status_code == 200:
                    # Create files dict for multipart upload
                    files = {
                        'file': ('book.pdf', pdf_response.content, 'application/pdf')
                    }

                    # Upload PDF using multipart/form-data
                    upload_response = requests.post(
                        f"{API_URL}/api/v1/university/library/book/upload/{book_id}",
                        files=files
                    )

                    if upload_response.status_code == 200:
                        print(f"PDF uploaded successfully for book: {
                              TITLES[i]}")
                    else:
                        print(f"Error uploading PDF: {
                              upload_response.status_code}")
                        print(upload_response.text)
                else:
                    print(f"Error downloading PDF: {pdf_response.status_code}")
            except Exception as e:
                print(
                    f"Error downloading/uploading PDF for {TITLES[i]}: {str(e)}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

    time.sleep(1)
