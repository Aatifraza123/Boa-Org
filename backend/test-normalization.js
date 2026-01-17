// Test delegate_type normalization
const testCases = [
  'BOA Member',
  'Non BOA Member',
  'Accompanying Person',
  'boa member',
  'NON BOA MEMBER'
];

testCases.forEach(delegate_type => {
  let normalizedDelegateType = delegate_type
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
  
  // Handle special case for "boa" to ensure it stays as "boa-member" not "b-o-a-member"
  normalizedDelegateType = normalizedDelegateType
    .replace('b-o-a', 'boa')
    .replace('non-boa', 'non-boa');

  console.log(`"${delegate_type}" -> "${normalizedDelegateType}"`);
});
