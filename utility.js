function validateName(string) {
  if (string.toUpperCase().trim().replace(/ /g, '').match(/[ÝýŸÿŶŷỲỳỴỵỶỷỸỹY][ÙùÚúÛûÜüŨũŪūŬŭŮůŰűŲųƯưǓǔǕǖǗǗǘǙǚǛǜỤụỦủỨứỪừỬửỮữU][ŚśŜŝŞşŠšS][èéêëeÈÉÊËÈèÉéÊêËëĒēĔĕĖėĘęĚěẸẹẺẻẼẽẾếỀềỂểỄễỆE][ƒF]/)) {
    string = "He Who Must Not Be Named";
  }
  return string.trim().replace(/ /g, '');
}

function messageCensor(string) {
  return string.replace(/[ÝýŸÿŶŷỲỳỴỵỶỷỸỹYy][uÙùÚúÛûÜüŨũŪūŬŭŮůŰűŲųƯưǓǔǕǖǗǗǘǙǚǛǜỤụỦủỨứỪừỬửỮữU][ŚśŜŝŞşŠšSs][eèéêëeÈÉÊËÈèÉéÊêËëĒēĔĕĖėĘęĚěẸẹẺẻẼẽẾếỀềỂểỄễỆE][fƒF]/g, 'He Who Must Not Be Named');
}

module.exports = {
  'validateName': validateName,
  'messageCensor': messageCensor
}
