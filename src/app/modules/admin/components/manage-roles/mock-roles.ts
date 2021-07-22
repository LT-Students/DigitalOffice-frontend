export interface Role {
    name: string,
    description: string,
    rights: number[]
}

export const ROLES: Role[] = [
    { name: 'Администратор', description: 'Главный на сайте', rights: [] },
    { name: 'Модератор', description: 'Тоже главный, но поменьше', rights: [] },
    { name: 'Сотрудник', description: 'Рядовой сотрудник', rights: [] }
]