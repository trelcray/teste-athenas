let s = 123456789;
function random() {
  s = (1103515245 * s + 12345) % 2147483647;
  return s % (10 - 1);
}

export function generateData(count: number) {
  let i;
  const surnames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Harris', 'Clark', 'Allen', 'Scott', 'Carter'];
  const names = ['James', 'John', 'Robert', 'Christopher', 'George', 'Mary', 'Nancy', 'Sandra', 'Michelle', 'Betty'];
  const gender = ['Male', 'Female'];
  const items = [];
  const startBirthDate = Date.parse('1/1/1975');
  const endBirthDate = Date.parse('1/1/1992');

  function addLeadingZero(number: number) {
    return number.toString().padStart(2, '0');
  }

  for (i = 0; i < count; i += 1) {
    const birthDate = new Date(startBirthDate + Math.floor(
      (random() * (endBirthDate - startBirthDate)) / 10,
    ));
    birthDate.setHours(12);

    const day = addLeadingZero(birthDate.getDate());
    const month = addLeadingZero(birthDate.getMonth() + 1); // getMonth() retorna o mês de 0 a 11, por isso é preciso adicionar 1
    const year = birthDate.getFullYear();

    const formattedBirthDate = `${day}/${month}/${year}`;

    const nameIndex = random();
    const item = {
      id: i + 1,
      firstName: names[nameIndex],
      lastName: surnames[random()],
      gender: gender[Math.floor(nameIndex / 5)],
      formattedBirthDate,
    };
    items.push(item);
  }
  return items;
}