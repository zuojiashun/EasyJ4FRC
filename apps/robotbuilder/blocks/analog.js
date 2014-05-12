// Analog

Blockly.Blocks['analog_input'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Declare Analog Input")
        .appendField(new Blockly.FieldVariable("Ain1"), "NAME");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .appendField("on Port");
    this.setInputsInline(true);
  }
};
Blockly.Java['analog_input'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);
  
  if (value_port=="") {
    block.setWarningText("Analog Input port not set. Defaulted to port 1.");
    value_port = 1;
  }
  else {
    block.setWarningText(null);
  }
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.AnalogChannel;");
  var code = 'AnalogChannel '+variable_name+' = new AnalogChannel('+value_port+');';
  return code;
};

Blockly.Blocks['get_analog_input_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Get ")
        .appendField(new Blockly.FieldDropdown([["Average Voltage", "getAverageVoltage"], ["Voltage", "getVoltage"], [" Average Value", "getAverageValue"]]), "WHAT")
        .appendField(new Blockly.FieldVariable("Ain1"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
  }
};
Blockly.Java['get_analog_input_value'] = function(block) {
  var dropdown_what = block.getFieldValue('WHAT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  //@todo make sure wariable_name has been declared
  var code = variable_name+'.'+dropdown_what+'()';
  return code;
};