#!/root/anaconda3/bin/python3
#!/root/anaconda3/lib/python3.7/site-packages
#!/root/anaconda3/lib/python3.7/site-packages/psycopg2
#!/root/anaconda3/envs/ttqh_analytic/lib/python3.5/site-packages/psycopg2
#!/root/anaconda3/pkgs/gdal-2.3.3-py37hbb2a789_0/lib/python3.7/site-packages/osgeo
#!/root/anaconda3/lib/python3.7/site-packages/osgeo




import sys
# sys.path.append("/root/anaconda3/lib/python3.7/site-packages/psycopg2")
# sys.path.append("/root/anaconda3/lib/python3.7/site-packages/osgeo")
import os
from fnmatch import fnmatch
import psycopg2
# from osgeo import ogr




namefile = sys.argv[1].split(".")[0]
table = sys.argv[2]

# os.system('''cd /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/storage/app/public/Shape_File/ && mv '''+namefile+'''.tmp.zip '''+namefile+'''.zip''')

connection = psycopg2.connect(user="postgres",
                                password="nguyenq12345678",
                                host="localhost",
                                port="5432",
                                database="postgres")
cursor = connection.cursor()


os.system('''mkdir -p /var/www/new-angiang/storage/app/public/Shape_File/'''+namefile)
os.system('''unzip /var/www/new-angiang/storage/app/public/Shape_File/'''+namefile+'''.zip -d /var/www/new-angiang/storage/app/public/Shape_File/'''+namefile)

root = '/var/www/new-angiang/storage/app/public/Shape_File/'+namefile
pattern = "*.shp"
listfile = []
# checklistfile = ['dangsau_2009_line.shp','diemdosau_2009_point.shp','diemdosau_2019_point.shp','satlo_mohinhthuyluc_line.shp','satlo_truottongthe_line.shp','satloduongbo_gis_line.shp','u_anh.shp','u_diem_do_mcn_moi.shp','u_diem_sat_lo.shp','u_doan_sat_lo.shp','u_tram_do_thuy_van.shp']
# checked = True
# asd = []


for path, subdirs, files in os.walk(root):
    for name in files:
        if fnmatch(name, pattern):
            listfile.append(os.path.join(path, name).replace('\\','/'))


# if len(listfile)==5:
# if checked==False:
#     for i in listfile:
#         if i.lower().split('/')[-1] in checklistfile:
#             checked = True
#             print(i.lower().split('/')[-1]+" Checked")
#         else:
#             checked = False
#             print("Vui long kiem tra lai ten file")
    #         break
    # if checked == True:
    #     for i in listfile:
    #         if i.lower().split('/')[-1] == 'qhpkranh.shp':
    #             driver = ogr.GetDriverByName("ESRI Shapefile")
    #             dataSource = driver.Open(i, 0)
    #             layer = dataSource.GetLayer()
    #             for feature in layer:
    #                 asd.append(feature.GetField("stt"))
    #                 asd.append(feature.GetField("maqh"))


        # likema = "'%"+asd[-1]+asd[0]+"%'"
        # print(likema)

i = listfile[0]
# if checked == True:
#     for i in listfile:
if table == 'diemks':
    tablename = 'hinh_anh_khao_sat_thuc_dia'
    # sql_delete_query = """Delete from dangsau_2009_line"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -S -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (geom, name, info, photos, created_at) select geom, name, info, photos, now() from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'doansl':
    tablename = 'doan_sat_lo'
    # sql_delete_query = """Delete from diemdosau_2009_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (geom, tendoan, mota, photos, created_at, stt, diadiem, chieudai, kc_nguyhiem, kc_antoan, tocdo, mucdo, shape_leng) select geom, tendoan, mota, photos, now(), stt, diadiem, chieudai, kc_nguyhie, kc_antoan, tocdo, mucdo, shape_leng from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'diemsl':
    tablename = 'diem_khao_sat_mat_cat_ngang'
    # sql_delete_query = """Delete from diemdosau_2019_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (geom, name, info, created_at) select geom, name, info, now() from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'quyhoach':
    tablename = 'quy_hoach'
    # sql_delete_query = """Delete from diemdosau_2019_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (sohieuvung,name,geom) select sohieuvung,name,geom from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'quyhoach_diemgoc':
    tablename = 'quy_hoach_diem_goc'
    # sql_delete_query = """Delete from diemdosau_2019_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (sohieuvung,diemkhepgo,geom) select sohieuvung,diemkhepgo,geom from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'quyhoach_dieuchinh':
    tablename = 'quy_hoach_dieuchinh'
    # sql_delete_query = """Delete from diemdosau_2019_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (de_xuat,name,geom) select de_xuat,name,geom from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'quyhoach_dieuchinh_diemgoc':
    tablename = 'quy_hoach_dieuchinh_diemgoc'
    # sql_delete_query = """Delete from diemdosau_2019_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (sohieuvung,diemkhepgo,geom) select sohieuvung,diemkhepgo,geom from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
elif table == 'ranhthua':
    tablename = 'ranhthua'
    # sql_delete_query = """Delete from diemdosau_2019_point"""
    # print(sql_delete_query)
    # cursor.execute(sql_delete_query)
    # connection.commit()
    # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
    cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+namefile+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
    print(cmd)
    os.system(cmd)  
    sql_append_query = """insert into """+tablename+""" (geom,so_hieu,muc_dich_s,dien_tich,ten_chu_ho,phuong,huyen) select geom,so_hieu,muc_dich_s,dien_tich,ten_chu_ho,phuong,huyen from """+tablename+namefile+"""_queue; DROP TABLE """+tablename+namefile+"""_queue;"""
    print(sql_append_query)
    cursor.execute(sql_append_query)
    connection.commit()
    print(i.split('/')[-1]+" imported")
# elif table == 'satlo_mohinhthuyluc_line':
#     tablename = table
#     sql_delete_query = """Delete from satlo_mohinhthuyluc_line"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (boi_xoi,shape_leng,geom) select boi_xoi,shape_leng,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'satlo_truottongthe_line':
#     tablename = table
#     sql_delete_query = """Delete from satlo_truottongthe_line"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (hs,shape_leng,geom) select hs,shape_leng,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'satloduongbo_gis_line':
#     tablename = table
#     sql_delete_query = """Delete from satloduongbo_gis_line"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (year_,shape_leng,geom) select year_,shape_leng,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'u_anh':
#     tablename = table
#     sql_delete_query = """Delete from u_anh"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (name,descriptio,geom) select name,descriptio,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'u_diem_do_mcn_moi':
#     tablename = table
#     sql_delete_query = """Delete from u_diem_do_mcn_moi"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (name,descriptio,geom) select name,descriptio,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'u_diem_sat_lo':
#     tablename = table
#     sql_delete_query = """Delete from u_diem_sat_lo"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (name,geom) select name,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'u_doan_sat_lo':
#     tablename = table
#     sql_delete_query = """Delete from u_doan_sat_lo"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (name,descriptio,geom) select name,descriptio,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")
# elif table == 'u_tram_do_thuy_van':
#     tablename = table
#     sql_delete_query = """Delete from u_tram_do_thuy_van"""
#     print(sql_delete_query)
#     cursor.execute(sql_delete_query)
#     connection.commit()
#     # cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#     cmd = '''shp2pgsql -c -D -I -s 32648 -W "UTF-8" '''+i+''' public.'''+tablename+'''_queue | PGPASSWORD=nguyenq12345678 psql -U postgres -d postgres -h localhost -p 5432'''
#     print(cmd)
#     os.system(cmd)  
#     sql_append_query = """insert into """+i.split('/')[-1].split('.')[0].lower()+""" (name,descriptio,timestamp,geom) select name,descriptio,timestamp,geom from """+tablename+"""_queue; DROP TABLE """+tablename+"""_queue;"""
#     print(sql_append_query)
#     cursor.execute(sql_append_query)
#     connection.commit()
#     print(i.split('/')[-1]+" imported")




# else:
#     print("Vui long upload day du va chinh xac cac lop shapefile")

#     if checked == True:
#         for i in listfile:
#             if 'qhpktimduong.shp' in i:
#                 tablename = i.split('/')[-1].split('.')[0]
#                 # os.system('''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt PROMOTE_TO_MULTI -nln '''+tablename+'''_queue''')        
#                 cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nln '''+tablename+'''_queue -append -nlt MULTILINESTRING'''
#                 print(cmd)
#                 os.system(cmd)        
#                 print(i.split('/')[-1]+" imported")
#             else:
#                 tablename = i.split('/')[-1].split('.')[0]
#                 # os.system('''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt PROMOTE_TO_MULTI -nln '''+tablename+'''_queue''')        
#                 cmd = '''ogr2ogr -f "PostgreSQL" "PG:host=gis.vlab.tech port=5433 user=test dbname=thongtinquyhoach_hcm_test password=123qwe" "'''+i+'''" -lco GEOMETRY_NAME=geom -lco FID=gid -lco PRECISION=no -nlt MULTIPOLYGON -nln '''+tablename+'''_queue -append'''
#                 print(cmd)
#                 os.system(cmd)        
#                 print(i.split('/')[-1]+" imported")
# else:
#     print("Vui long upload day du va chinh xac 5 lop shapefile")
cursor.close()
connection.close()

os.system('rm -rf '+root)
os.system('rm '+'''/var/www/new-angiang/storage/app/public/Shape_File/'''+namefile+'''.zip''')