{"filter":false,"title":"app.py","tooltip":"/app.py","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":0,"column":10},"action":"insert","lines":["31490.4942"],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":10},"action":"remove","lines":["31490.4942"],"id":2},{"start":{"row":0,"column":0},"end":{"row":155,"column":54},"action":"insert","lines":["import math\t","\t","\tclass SVY21:","\t# Ref: http://www.linz.govt.nz/geodetic/conversion-coordinates/projection-conversions/transverse-mercator-preliminary-computations/index.aspx","\t","\t# WGS84 Datum","\ta = 6378137","\tf = 1 / 298.257223563","\t","\t# SVY21 Projection","\t# Fundamental point: Base 7 at Pierce Resevoir.","\t# Latitude: 1 22 02.9154 N, longitude: 103 49 31.9752 E (of Greenwich).","\t","\t# Known Issue: Setting (oLat, oLon) to the exact coordinates specified above","\t# results in computation being slightly off. The values below give the most","\t# accurate represenation of test data.","\toLat = 1.366666     # origin's lat in degrees","\toLon = 103.833333   # origin's lon in degrees","\toN = 38744.572      # false Northing","\toE = 28001.642      # false Easting","\tk = 1               # scale factor","\t","\tdef __init__(self):","\tself.b = self.a * (1 - self.f)","\tself.e2 = (2 * self.f) - (self.f * self.f)","\tself.e4 = self.e2 * self.e2","\tself.e6 = self.e4 * self.e2","\tself.A0 = 1 - (self.e2 / 4) - (3 * self.e4 / 64) - (5 * self.e6 / 256);","\tself.A2 = (3. / 8.) * (self.e2 + (self.e4 / 4) + (15 * self.e6 / 128));","\tself.A4 = (15. / 256.) * (self.e4 + (3 * self.e6 / 4));","\tself.A6 = 35 * self.e6 / 3072;","\t","\tdef computeSVY21(self, lat, lon):","\t\"\"\"","\tReturns a pair (N, E) representing Northings and Eastings in SVY21.","\t\"\"\"","\t","\tlatR = lat * math.pi / 180","\tsinLat = math.sin(latR)","\tsin2Lat = sinLat * sinLat","\tcosLat = math.cos(latR)","\tcos2Lat = cosLat * cosLat","\tcos3Lat = cos2Lat * cosLat","\tcos4Lat = cos3Lat * cosLat","\tcos5Lat = cos4Lat * cosLat","\tcos6Lat = cos5Lat * cosLat","\tcos7Lat = cos6Lat * cosLat","\t","\trho = self.calcRho(sin2Lat)","\tv = self.calcV(sin2Lat)","\tpsi = v / rho","\tt = math.tan(latR)","\tw = (lon - self.oLon) * math.pi / 180","\t","\tM = self.calcM(lat)","\tMo = self.calcM(self.oLat)","\t","\tw2 = w * w","\tw4 = w2 * w2","\tw6 = w4 * w2","\tw8 = w6 * w2","\t","\tpsi2 = psi * psi","\tpsi3 = psi2 * psi","\tpsi4 = psi3 * psi","\t","\tt2 = t * t","\tt4 = t2 * t2","\tt6 = t4 * t2","\t","\t# Compute Northing","\tnTerm1 = w2 / 2 * v * sinLat * cosLat","\tnTerm2 = w4 / 24 * v * sinLat * cos3Lat * (4 * psi2 + psi - t2)","\tnTerm3 = w6 / 720 * v * sinLat * cos5Lat * ((8 * psi4) * (11 - 24 * t2) - (28 * psi3) * (1 - 6 * t2) + psi2 * (1 - 32 * t2) - psi * 2 * t2 + t4)","\tnTerm4 = w8 / 40320 * v * sinLat * cos7Lat * (1385 - 3111 * t2 + 543 * t4 - t6)","\tN = self.oN + self.k * (M - Mo + nTerm1 + nTerm2 + nTerm3 + nTerm4)","\t","\t# Compute Easting","\teTerm1 = w2 / 6 * cos2Lat * (psi - t2)","\teTerm2 = w4 / 120 * cos4Lat * ((4 * psi3) * (1 - 6 * t2) + psi2 * (1 + 8 * t2) - psi * 2 * t2 + t4)","\teTerm3 = w6 / 5040 * cos6Lat * (61 - 479 * t2 + 179 * t4 - t6)","\tE = self.oE + self.k * v * w * cosLat * (1 + eTerm1 + eTerm2 + eTerm3)","\t","\treturn (N, E)","\t","\tdef calcM(self, lat):","\tlatR = lat * math.pi / 180","\treturn self.a * ((self.A0 * latR) - (self.A2 * math.sin(2 * latR)) + (self.A4 * math.sin(4 * latR)) - (self.A6 * math.sin(6 * latR)))","\t","\tdef calcRho(self, sin2Lat):","\tnum = self.a * (1 - self.e2)","\tdenom = math.pow(1 - self.e2 * sin2Lat, 3. / 2.)","\treturn num / denom","\t","\tdef calcV(self, sin2Lat):","\tpoly = 1 - self.e2 * sin2Lat","\treturn self.a / math.sqrt(poly)","\t","\tdef computeLatLon(self, N, E):","\t\"\"\"","\tReturns a pair (lat, lon) representing Latitude and Longitude.","\t\"\"\"","\t","\tNprime = N - self.oN","\tMo = self.calcM(self.oLat)","\tMprime = Mo + (Nprime / self.k)","\tn = (self.a - self.b) / (self.a + self.b)","\tn2 = n * n","\tn3 = n2 * n","\tn4 = n2 * n2","\tG = self.a * (1 - n) * (1 - n2) * (1 + (9 * n2 / 4) + (225 * n4 / 64)) * (math.pi / 180)","\tsigma = (Mprime * math.pi) / (180. * G)","\t","\tlatPrimeT1 = ((3 * n / 2) - (27 * n3 / 32)) * math.sin(2 * sigma)","\tlatPrimeT2 = ((21 * n2 / 16) - (55 * n4 / 32)) * math.sin(4 * sigma)","\tlatPrimeT3 = (151 * n3 / 96) * math.sin(6 * sigma)","\tlatPrimeT4 = (1097 * n4 / 512) * math.sin(8 * sigma)","\tlatPrime = sigma + latPrimeT1 + latPrimeT2 + latPrimeT3 + latPrimeT4","\t","\tsinLatPrime = math.sin(latPrime)","\tsin2LatPrime = sinLatPrime * sinLatPrime","\t","\trhoPrime = self.calcRho(sin2LatPrime)","\tvPrime = self.calcV(sin2LatPrime)","\tpsiPrime = vPrime / rhoPrime","\tpsiPrime2 = psiPrime * psiPrime","\tpsiPrime3 = psiPrime2 * psiPrime","\tpsiPrime4 = psiPrime3 * psiPrime","\ttPrime = math.tan(latPrime)","\ttPrime2 = tPrime * tPrime","\ttPrime4 = tPrime2 * tPrime2","\ttPrime6 = tPrime4 * tPrime2","\tEprime = E - self.oE","\tx = Eprime / (self.k * vPrime)","\tx2 = x * x","\tx3 = x2 * x","\tx5 = x3 * x2","\tx7 = x5 * x2","\t","\t# Compute Latitude","\tlatFactor = tPrime / (self.k * rhoPrime)","\tlatTerm1 = latFactor * ((Eprime * x) / 2)","\tlatTerm2 = latFactor * ((Eprime * x3) / 24) * ((-4 * psiPrime2) + (9 * psiPrime) * (1 - tPrime2) + (12 * tPrime2))","\tlatTerm3 = latFactor * ((Eprime * x5) / 720) * ((8 * psiPrime4) * (11 - 24 * tPrime2) - (12 * psiPrime3) * (21 - 71 * tPrime2) + (15 * psiPrime2) * (15 - 98 * tPrime2 + 15 * tPrime4) + (180 * psiPrime) * (5 * tPrime2 - 3 * tPrime4) + 360 * tPrime4)","\tlatTerm4 = latFactor * ((Eprime * x7) / 40320) * (1385 - 3633 * tPrime2 + 4095 * tPrime4 + 1575 * tPrime6)","\tlat = latPrime - latTerm1 + latTerm2 - latTerm3 + latTerm4","\t","\t# Compute Longitude","\tsecLatPrime = 1. / math.cos(lat)","\tlonTerm1 = x * secLatPrime","\tlonTerm2 = ((x3 * secLatPrime) / 6) * (psiPrime + 2 * tPrime2)","\tlonTerm3 = ((x5 * secLatPrime) / 120) * ((-4 * psiPrime3) * (1 - 6 * tPrime2) + psiPrime2 * (9 - 68 * tPrime2) + 72 * psiPrime * tPrime2 + 24 * tPrime4)","\tlonTerm4 = ((x7 * secLatPrime) / 5040) * (61 + 662 * tPrime2 + 1320 * tPrime4 + 720 * tPrime6)","\tlon = (self.oLon * math.pi / 180) + lonTerm1 - lonTerm2 + lonTerm3 - lonTerm4","\t","\treturn (lat / (math.pi / 180), lon / (math.pi / 180))"]}]]},"ace":{"folds":[],"scrolltop":1581,"scrollleft":0,"selection":{"start":{"row":86,"column":27},"end":{"row":86,"column":27},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":78,"state":"start","mode":"ace/mode/python"}},"timestamp":1564108385857,"hash":"8c4036cb67bb850f03120f8a54796af63cfdf462"}