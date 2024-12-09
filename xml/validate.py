from lxml import etree

# Paths to your XML and XSD files
xsd_file = 'bookstore.xsd'
xml_file = 'bookstore.xml'

# Parse the XSD schema
with open(xsd_file, 'rb') as xsd:
    schema_root = etree.XML(xsd.read())
    schema = etree.XMLSchema(schema_root)

# Parse the XML file
with open(xml_file, 'rb') as xml:
    xml_doc = etree.parse(xml)

# Validate the XML against the XSD
is_valid = schema.validate(xml_doc)
print("XML is valid." if is_valid else "XML is not valid.")
if not is_valid:
    for error in schema.error_log:
        print("Error:", error.message)
