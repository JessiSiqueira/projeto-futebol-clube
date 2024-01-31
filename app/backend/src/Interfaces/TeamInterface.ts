type IdType = {
  id: number;
};

interface TeamInterface extends IdType {
  teamName: string
}

export {
  IdType,
  TeamInterface,
};
