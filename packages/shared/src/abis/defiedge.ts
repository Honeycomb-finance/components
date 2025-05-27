import { Interface } from '@ethersproject/abi';
import DEFIEDGE_ABI from './defiedge.json';

const DEFIEDGE_INTERFACE = new Interface(DEFIEDGE_ABI);

export { DEFIEDGE_ABI, DEFIEDGE_INTERFACE };
