import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
import psycopg2
import sys

pointid = sys.argv[1]
filename = sys.argv[2]

conn = psycopg2.connect(host='localhost',
                        port='5432',
                        user='postgres',
                        password='nguyenq12345678',
                        database='postgres')

cursor = conn.cursor()

df = pd.read_excel('/var/www/new-angiang/storage/app/public/uploadedimages/'+str(pointid)'/excel/'+str(filename), 'Sheet1')

for i in df.index:
    khoangcach = df['KhoangCach'][i]
    dosau = df['DoSau'][i]
    thoigian = df['ThoiGian'][i]
    sql_delete_query = """set DateStyle='ISO, DMY';INSERT INTO excel_matcat (pointid,khoangcach,dosau,thoigian) VALUES ('"""+str(pointid)+"""','"""+str(khoangcach)+"""','"""+str(dosau)+"""','"""+str(thoigian)+"""')"""
    cursor.execute(sql_delete_query)
    conn.commit()

