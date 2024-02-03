import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface CustomRepositoryInterface
  extends RepositoryInterface<Customer> {}
