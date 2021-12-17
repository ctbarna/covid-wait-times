import re
import requests
import PyPDF2
import csv

response = requests.get("https://hhinternet.blob.core.windows.net/wait-times/testing-wait-times.pdf")
with open("testing-wait-times.pdf", "wb") as f:
    f.write(response.content)

file = open("testing-wait-times.pdf", "rb") 
pdfReader = PyPDF2.PdfFileReader(file)
page = pdfReader.getPage(0)
lines = page.extractText().split("\n")

cursor = 0
keep_going = True
writer = csv.DictWriter(open("wait-times.csv", "w"), fieldnames=["location", "wait_time", "last_reported"])
writer.writeheader()
while keep_going:
    if re.match("\d{2}\/\d{2}\/\d{4}", lines[cursor]):
        keep_going = False
        break
    place = lines[cursor]
    wait_time = lines[cursor + 1]
    if wait_time == "Not Reported Yet":
        cursor += 3
        last_reported = None
    else:
        last_reported = lines[cursor + 3]
        cursor += 4

    writer.writerow({"location": place, "wait_time": wait_time, "last_reported": last_reported})