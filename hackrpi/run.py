import os
#try:
from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
from SocketServer import TCPServer as Server
from flask import Flask, render_template, request
from flask.ext.googlemaps import GoogleMaps
from flask.ext.googlemaps import Map
#from dynamic_query import filteredCluster  
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/m')
def indexm():
    return render_template('indexm.html')
@app.route('/ru')
def ru():
    return render_template('index.backup.html')
@app.route('/style')
def style():
    return render_template('style.html')
@app.route('/admin')
def admin():
    return render_template('admin.html')
@app.route('/tables.html')
def tables():pass
@app.route('/charts.html')
def charts():
    return render_template('charts.html')
@app.route('/landing')
def landing():
    return render_template('landing.html')

@app.route('/feature_select', methods=['POST'])
def feature_select():
    print "I'm here!"
    if request.method == 'POST':
        print "Yay"
    featureList = request.form.get('featureList', '')
    featureList = featureList.split(";")
    featureList.pop()
    
    featureStr = []    
    for flist in featureList:    
        attrib = flist.split(",")
        print float(attrib[0]), float(attrib[1])
        featureStr.append([float(attrib[0]), float(attrib[1])])
        #for f in featureStr:
            #pass
            #print f, type(f)
            #featureValue.append([int(f[0]), int(f[1])])
    print featureStr
    filteredCluster(featureStr)
    '''
    for i,f in enumerate(featureValue):
        print f
        if i == 0:
            filter_area = f.split(",")
        if i == 1:
            filter_perimeter = f.split(",")
        if i == 2:
            filter_compactness = f.split(",")
        if i == 3:
            filter_assym = f.split(",")
        if i == 4:
            filter_BoundaryIndex = f.split(",")
        if i == 5:
            filter_contrat = f.split(",")
        if i == 6:
            filter_energy = f.split(",")
        if i == 7:
            filter_homogeneity= f.split(",")
        if i == 8:
            filter_correlation = f.split(",")
        if i == 9:
            filter_dissimilarity = f.split(",")
        if i == 10:
            filter_asm = f.split(",")
    '''
            
    """filteredCluster(filter_area,filter_perimeter,filter_compactness,filter_assym,filter_BoundaryIndex,
                    filter_contrast,filter_energy,filter_homogeneity,filter_correlation,filter_dissimilarity,
                    filter_asm): """     
            
    #print type(featureList), featureList, "@@"    
    
    #return jsonify(result=a + b)
    return None

try:
  #print("Start serving at port %i" % PORT)
  #httpd.serve_forever()
  app = Flask(__name__, template_folder=".")
  GoogleMaps(app)

  @app.route("/")
  def mapview():
	# creating a map in the view
	mymap = Map(
	identifier="view-side",
	lat=37.4419,
	lng=-122.1419,
	#markers=[(37.4419, -122.1419)]
	markers={'static/img/map-marker-green.png':[(37.4419, -122.1419)],
                 'static/img/map-marker-red.png':[(37.4300, -122.1400)]}
  	)
	
	#{% for marker in markers %}  
        #addMarker({{marker.lat}},{{marker.long}},'{{marker.name}}', '{{marker.url}}');        
	#{% endfor %}

 	return render_template('index.html', mymap=mymap)

  if __name__ == '__main__':
	app.run(debug=True)
  	#app.run(host='0.0.0.0', port=int(port))
except KeyboardInterrupt:
  pass

#if __name__ == '__main__':
    #app.run(debug=True)
