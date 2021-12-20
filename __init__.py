import re
import requests
import PyPDF2
import csv

from fixtures import centers

# PyPDF2 can't read a requests response stream so write the file to disk.
response = requests.get("https://hhinternet.blob.core.windows.net/wait-times/testing-wait-times.pdf")
with open("testing-wait-times.pdf", "wb") as f:
    f.write(response.content)

# Reopen that same file.
file = open("testing-wait-times.pdf", "rb") 
pdfReader = PyPDF2.PdfFileReader(file)
page = pdfReader.getPage(0)
lines = page.extractText().split("\n")
import logging

cursor = 0
keep_going = True

rows = []

# Using a while loop because the offsets are different for each entry.
while keep_going:
    # In the current formatting, the terminator is a date.
    if re.match("\d{2}\/\d{2}\/\d{4}", lines[cursor]):
        keep_going = False
        break

    place = lines[cursor]
    wait_time = lines[cursor + 1]
    # If the wait time is not reported, there is no line for it so update the
    # offset by one fewer.
    if wait_time == "Not Reported Yet":
        cursor += 3
        last_reported = None
    else:
        last_reported = lines[cursor + 3]
        cursor += 4

    center = centers.get(place)
    if center is not None:
        address = center.get("address")
        boro = center.get("boro")
        fullname = center.get("fullname", place)
    else:
        logging.warning("Center not found %s " % place)
        address = None
        boro = None
        fullname = None

    rows.append({
        "location": place,
        "fullname": fullname,
        "address": address,
        "borough": boro,
        "wait_time": wait_time,
        "last_reported": last_reported,
    })

writer = csv.DictWriter(open("wait-times.csv", "w"), fieldnames=[
    "fullname",
    "wait_time",
    "last_reported",
    "address",
    "borough",
    "location"])
writer.writeheader()
writer.writerows(rows)
