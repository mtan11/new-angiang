import sys
import os


# stt = sys.argv[1]
# maqh= sys.argv[2]
# sqlranh = "SELECT * FROM public.qhpkranh_queue WHERE public.qhpkranh_queue.stt = '"+stt+"' and public.qhpkranh_queue.maqh= '"+maqh+"'"
# sqlchitieuopho = "SELECT public.qhpkchitieuopho_queue.* FROM public.qhpkchitieuopho_queue,public.qhpkranh_queue WHERE public.qhpkranh_queue.stt = '"+stt+"' and public.qhpkranh_queue.maqh= '"+maqh+"' and ST_Intersects(public.qhpkchitieuopho_queue.geom, public.qhpkranh_queue.geom)"
# sqlsdd = "SELECT public.qhpksdd_queue.* FROM public.qhpksdd_queue,public.qhpkranh_queue WHERE public.qhpkranh_queue.stt = '"+stt+"' and public.qhpkranh_queue.maqh= '"+maqh+"' and ST_Intersects(public.qhpksdd_queue.geom, public.qhpkranh_queue.geom)"
# sqlgiaothong = "SELECT public.qhpktimduong_queue.* FROM public.qhpktimduong_queue,public.qhpkranh_queue WHERE public.qhpkranh_queue.stt = '"+stt+"' and public.qhpkranh_queue.maqh= '"+maqh+"' and ST_Intersects(public.qhpktimduong_queue.geom, public.qhpkranh_queue.geom)"
# sqltimduong = "SELECT public.qhpkgiaothong_queue.* FROM public.qhpkgiaothong_queue,public.qhpkranh_queue WHERE public.qhpkranh_queue.stt = '"+stt+"' and public.qhpkranh_queue.maqh= '"+maqh+"' and ST_Intersects(public.qhpkgiaothong_queue.geom, public.qhpkranh_queue.geom)"
# madoan = maqh+stt
diemks = "SELECT * FROM public.hinh_anh_khao_sat_thuc_dia"
diemsl = "SELECT * FROM public.diem_khao_sat_mat_cat_ngang"
doansl = "SELECT * FROM public.doan_sat_lo"
# sqlchitieuopho = "SELECT public.qhpkchitieuopho_queue.* FROM public.qhpkchitieuopho_queue,public.qhpksdd_queue WHERE ST_Intersects(public.qhpkchitieuopho_queue.geom, public.qhpksdd_queue.geom) and public.qhpksdd_queue.maso LIKE '%"+madoan+"%'"
# sqlsdd = "SELECT public.qhpksdd_queue.* FROM public.qhpksdd_queue WHERE public.qhpksdd_queue.maso LIKE '%"+madoan+"%'"
# # sqltimduong = "SELECT a.gid,a.maduonggt,a.tenduong,a.doantu,a.logioi,a.chieudai,a.tmdv,a.dtt,a.ktlgduong,a.ktvhtrai,a.ktvhphai,a.shape_leng,st_multi(a.geom) as geom, a.created_at,a.updated_at,a.deleted_at FROM public.qhpktimduong_queue as a,public.qhpkranh_queue WHERE public.qhpkranh_queue.stt = '"+stt+"' and public.qhpkranh_queue.maqh= '"+maqh+"' and ST_Intersects(public.qhpktimduong_queue.geom, public.qhpkranh_queue.geom)"
# sqltimduong = "SELECT public.qhpktimduong_queue.* FROM public.qhpktimduong_queue WHERE public.qhpktimduong_queue.maduonggt LIKE '"+madoan+"%'"
# sqlgiaothong = "SELECT public.qhpkgiaothong_queue.* FROM public.qhpkgiaothong_queue WHERE public.qhpkgiaothong_queue.maduonggt LIKE '"+madoan+"%'"



os.system('''ogr2ogr -f "ESRI Shapefile" /var/www/new-angiang/storage/app/public/temp/diemsl.shp PG:"host=127.0.0.1 port=5432 user=postgres dbname=postgres password=nguyenq12345678" -sql "'''+diemsl+'''" -lco ENCODING=UTF-8''')
os.system('''ogr2ogr -f "ESRI Shapefile" /var/www/new-angiang/storage/app/public/temp/diemks.shp PG:"host=127.0.0.1 port=5432 user=postgres dbname=postgres password=nguyenq12345678" -sql "'''+diemks+'''" -lco ENCODING=UTF-8''')
os.system('''ogr2ogr -f "ESRI Shapefile" /var/www/new-angiang/storage/app/public/temp/doansl.shp PG:"host=127.0.0.1 port=5432 user=postgres dbname=postgres password=nguyenq12345678" -sql "'''+doansl+'''" -lco ENCODING=UTF-8''')
# os.system('''ogr2ogr -f "ESRI Shapefile" /var/www/new-angiangstorage/app/public/temp/qhpktimduong.shp PG:"host=127.0.0.1 port=5432 user=postgres dbname=postgres password=nguyenq12345678" -sql "'''+sqltimduong+'''" -lco ENCODING=UTF-8''')
# os.system('''ogr2ogr -f "ESRI Shapefile" /var/www/new-angiangstorage/app/public/temp/qhpkgiaothong.shp PG:"host=127.0.0.1 port=5432 user=postgres dbname=postgres password=nguyenq12345678" -sql "'''+sqlgiaothong+'''" -lco ENCODING=UTF-8''')
os.system('''rm /var/www/new-angiang/storage/app/public/shp.zip''')
os.system('''cd /var/www/new-angiang/storage/app/public/temp/ && /usr/bin/zip -rm /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/storage/app/public/shp.zip ./*''')

