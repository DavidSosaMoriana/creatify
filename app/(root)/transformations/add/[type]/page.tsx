import Header from "@/components/shared/header";
import { transformationTypes } from "@/constants";

const AddTransformationTypePage = ({ params: { type } }: SearchParamProps) => {
  const transformation = transformationTypes[type];

  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
    </div>
  );
};

export default AddTransformationTypePage;
