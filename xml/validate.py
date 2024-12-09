from lxml import etree

# Load XML and XSD files
xml_file = 'xml/bookstore.xml'
xsd_file = 'xml/bookstore.xsd'

# Parse the XML and XSD files
with open(xml_file, 'r') as xml:
    xml_doc = etree.parse(xml)
with open(xsd_file, 'r') as xsd:
    xsd_doc = etree.parse(xsd)
    
# Create an XML schema object
xmlschema = etree.XMLSchema(xsd_doc)

# Validate the XML against the XSD
is_valid = xmlschema.validate(xml_doc)

# Output the result
if is_valid:
    print("The XML is valid.")
else:
    print("The XML is invalid.")
    for error in xmlschema.error_log:
        print(error.message)